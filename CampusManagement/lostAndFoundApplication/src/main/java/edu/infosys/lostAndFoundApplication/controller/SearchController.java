package edu.infosys.lostAndFoundApplication.controller;

import edu.infosys.lostAndFoundApplication.bean.LostItem;
import edu.infosys.lostAndFoundApplication.bean.FoundItem;
import edu.infosys.lostAndFoundApplication.service.LostItemService;
import edu.infosys.lostAndFoundApplication.service.FoundItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lost-found/api/search")
@CrossOrigin(origins = { "http://localhost:3939"})
public class SearchController {

    @Autowired
    private LostItemService lostItemService;

    @Autowired
    private FoundItemService foundItemService;

    @GetMapping("/lost")
    public List<LostItem> searchLost(@RequestParam("q") String query) {
        return lostItemService.searchLostItems(query);
    }

    @GetMapping("/found")
    public List<FoundItem> searchFound(@RequestParam("q") String query) {
        return foundItemService.searchFoundItems(query);
    }
}
