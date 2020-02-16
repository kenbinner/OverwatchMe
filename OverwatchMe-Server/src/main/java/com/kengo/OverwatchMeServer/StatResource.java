package com.kengo.OverwatchMeServer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api")
public class StatResource {

    public String apiUrl = "https://public-api.tracker.gg/v2/overwatch/standard/profile/";
    public String apiKey = "b92f295f-b1be-40ce-8b48-fc080fedf90d";

    //Works for psn and xbl, not for battlenet
    @GetMapping(value="getStats/{platform}/{playerId}/{playerNum}")
    public ResponseEntity<String> getStats(@PathVariable("platform") String platform,
                                           @PathVariable("playerId") String playerId,
                                           @PathVariable("playerNum") String playerNum){

        try{
            boolean pc = false;
            System.out.println(playerNum);
            if(!playerNum.equals("0")){
                pc = true;
            }

            if(pc){
                playerId = playerId + "%23" + playerNum;
            }

            RestTemplate restTemplate = new RestTemplate();
            final String compositeUrl = apiUrl + platform + "/" + playerId +"?TRN-Api-Key=" + apiKey;
            System.out.println("Retrieving from: " + compositeUrl);
            String stats = restTemplate.getForObject(
                    compositeUrl, String.class);
            return new ResponseEntity<String>(stats, HttpStatus.OK);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Profile not found");
        }
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
