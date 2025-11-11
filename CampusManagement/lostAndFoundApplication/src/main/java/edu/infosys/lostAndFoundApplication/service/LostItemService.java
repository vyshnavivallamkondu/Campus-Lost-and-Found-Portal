package edu.infosys.lostAndFoundApplication.service;
import edu.infosys.lostAndFoundApplication.bean.LostItem;
import edu.infosys.lostAndFoundApplication.dao.LostItemDao;
import edu.infosys.lostAndFoundApplication.dao.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import edu.infosys.lostAndFoundApplication.util.FuzzySearchUtil;
import java.util.Comparator;
import java.util.Map;
import java.util.LinkedHashMap;


@Service
public class LostItemService {

    @Autowired
    private LostItemDao lostItemDao;
    
    @Autowired
	private LostItemRepository repository;
    
    public synchronized String generateNextLostItemId() {
        Long maxId = lostItemDao.findMaxIdNumber();
        long nextId = (maxId == null) ? 1 : maxId + 1;
        return String.format("L%04d", nextId);
    }

    public LostItem addLostItem(LostItem lostItem) {
        lostItem.setLostItemId(generateNextLostItemId());
        return lostItemDao.save(lostItem);
    }

    public List<LostItem> getAllLostItems() {
        return lostItemDao.findAll();
    }



    public Optional<LostItem> getLostItemById(String id) {
        return lostItemDao.findById(id);
    }

    public void deleteLostItem(String id) {
        lostItemDao.deleteById(id);
    }

    public List<LostItem> getLostItemsByUsername(String username) {
        return lostItemDao.findByUsername(username);
    }
    
    public int findAllItems() {
    	return lostItemDao.findAllItems().size();
    }
    
    /**
     * Fuzzy search across multiple fields (itemName, category, brand, color, location).
     * Returns results sorted by a very simple score (higher = better).
     */
    public List<LostItem> searchLostItems(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }
        String q = query.trim().toLowerCase();
        List<LostItem> all = repository.findAll();
        Map<LostItem, Double> scored = new LinkedHashMap<>();

        for (LostItem item : all) {
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

            if (score > 0) {
                scored.put(item, score);
            }
        }
        return scored.entrySet().stream()
                .sorted(Map.Entry.<LostItem, Double>comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
	 @Autowired
    private FoundItemService foundItemService;

    public List<FoundItem> getPotentialMatches(String lostItemId) {
        Optional<LostItem> lostOpt = lostItemDao.findById(lostItemId);
        if (lostOpt.isEmpty()) return List.of();

        LostItem lost = lostOpt.get();
        List<FoundItem> allFound = foundItemService.getAllFoundItems();

        // Simple weighted fuzzy match scoring
        Map<FoundItem, Double> scored = new LinkedHashMap<>();
        for (FoundItem found : allFound) {
            double score = 0.0;

            if (FuzzySearchUtil.isFuzzyMatch(found.getItemName(), lost.getItemName())) score += 3.0;
            if (FuzzySearchUtil.isFuzzyMatch(found.getCategory(), lost.getCategory())) score += 2.0;
            if (FuzzySearchUtil.isFuzzyMatch(found.getColor(), lost.getColor())) score += 1.0;
            if (FuzzySearchUtil.isFuzzyMatch(found.getBrand(), lost.getBrand())) score += 1.0;
            if (FuzzySearchUtil.isFuzzyMatch(found.getLocation(), lost.getLocation())) score += 1.0;

            if (score >= 4.0) { // threshold for relevance
                scored.put(found, score);
            }
        }

        return scored.entrySet().stream()
                .sorted(Map.Entry.<FoundItem, Double>comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

}
