package com.kengo.OverwatchMeServer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping
public class StatResource {

    public String apiUrl = "https://public-api.tracker.gg/v2/overwatch/standard/profile/";
    public String apiKey = "b92f295f-b1be-40ce-8b48-fc080fedf90d";

    //Works for psn and xbl, not for battlenet

    @GetMapping(value="api/{platform}/{playerId}")
    public ResponseEntity<String> getStats(@PathVariable("platform") String platform,
                                           @PathVariable("playerId") String playerId){
        RestTemplate restTemplate = new RestTemplate();

        String stats = restTemplate.getForObject(
                apiUrl + platform + "/" + playerId +"?TRN-Api-Key=" + apiKey, String.class);

        return new ResponseEntity<String>(stats, HttpStatus.OK);
    }

    //Working Apex Get Method
    /*
    public String apexUrl = "https://public-api.tracker.gg/v2/apex/standard/profile/";
    @GetMapping(value="api/{platform}/{playerId}")
    public ResponseEntity<String> getStats(@PathVariable("platform") String platform,
                                           @PathVariable("playerId") String playerId){
        RestTemplate restTemplate = new RestTemplate();
        String stats = restTemplate.getForObject(
                apexUrl + platform + "/" + playerId + "?TRN-Api-Key=" + apiKey, String.class);

        return new ResponseEntity<String>(stats, HttpStatus.OK);
    }*/
}
