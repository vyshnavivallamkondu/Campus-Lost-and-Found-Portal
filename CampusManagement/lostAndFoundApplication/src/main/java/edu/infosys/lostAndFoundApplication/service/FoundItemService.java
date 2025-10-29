package edu.infosys.lostAndFoundApplication.service;

import edu.infosys.lostAndFoundApplication.bean.FoundItem;
import edu.infosys.lostAndFoundApplication.dao.FoundItemDao;
import edu.infosys.lostAndFoundApplication.util.FuzzySearchUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoundItemService {

    @Autowired
    private FoundItemDao foundItemDao;

    public synchronized String generateNextFoundItemId() {
        Long maxId = foundItemDao.findMaxIdNumber();
        long nextId = (maxId == null) ? 1 : maxId + 1;
        return String.format("F%04d", nextId);
    }

    public FoundItem addFoundItem(FoundItem foundItem) {
        foundItem.setFoundItemId(generateNextFoundItemId());
        return foundItemDao.save(foundItem);
    }

    public List<FoundItem> getAllFoundItems() {
        return foundItemDao.findAll();
    }

    public Optional<FoundItem> getFoundItemById(String id) {
        return foundItemDao.findById(id);
    }

    public void deleteFoundItem(String id) {
        foundItemDao.deleteById(id);
    }

    public List<FoundItem> getFoundItemsByUsername(String username) {
        return foundItemDao.findByUsername(username);
    }
    
    public int getTotalFoundItem() {
    	return foundItemDao.getTotalFoundItem().size();
    }

    public List<FoundItem> searchFoundItems(String query) {
        if (query == null || query.trim().isEmpty()) return List.of();

        String q = query.trim().toLowerCase();
        List<FoundItem> all = foundItemDao.findAll(); // make sure dao has findAll(), or use a FoundItemRepository

        Map<FoundItem, Double> scored = new LinkedHashMap<>();
        for (FoundItem item : all) {
            double score = 0.0;
            if (item.getItemName() != null && item.getItemName().toLowerCase().contains(q)) score += 2.0;
            if (item.getCategory() != null && item.getCategory().toLowerCase().contains(q)) score += 1.5;
            if (item.getBrand() != null && item.getBrand().toLowerCase().contains(q)) score += 1.2;
            if (item.getColor() != null && item.getColor().toLowerCase().contains(q)) score += 0.8;
            if (item.getLocation() != null && item.getLocation().toLowerCase().contains(q)) score += 0.8;

            if (FuzzySearchUtil.isFuzzyMatch(item.getItemName(), q)) score += 1.5;
            if (FuzzySearchUtil.isFuzzyMatch(item.getCategory(), q)) score += 1.0;
            if (FuzzySearchUtil.isFuzzyMatch(item.getBrand(), q)) score += 0.9;
            if (FuzzySearchUtil.isFuzzyMatch(item.getColor(), q)) score += 0.5;
            if (FuzzySearchUtil.isFuzzyMatch(item.getLocation(), q)) score += 0.5;

            if (score > 0) scored.put(item, score);
        }

        return scored.entrySet().stream()
                .sorted(Map.Entry.<FoundItem, Double>comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

}