package com.kengo.OverwatchMeServer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

@RestController
public class StatResource {

    @RequestMapping("/stats/{playerId}")
    public ResponseEntity<String> getStats(@PathVariable("playerId") String playerId){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("TRN-Api-Key", "b92f295f-b1be-40ce-8b48-fc080fedf90d");

        String stats = restTemplate.getForObject(
                "https://public-api.tracker.gg/v2/overwatch/standard/profile/battlenet/" + playerId + "%232772",
                String.class
        );

        return new ResponseEntity<String>(stats, HttpStatus.OK);
    }
}
