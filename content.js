chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.command == "getStats"){

        //restoring prefix option...
        console.log("restoring options...");
        var prefix_text = "";
        
        console.log("selected session val:", $("#stats > div:first-child > select").val());
        console.log("selected session:", $("#stats > div:first-child > select option:selected").text());

        (async () => {
            var prefixObj = await browser.storage.sync.get("prefix");
            prefix_text = prefixObj.prefix;
            if(prefix_text) prefix_text = prefix_text + "\n";
            console.log("restore .prefix text : ", prefix_text);
        })()

        //restoring indicator option...
        var indicator_text = "";
        var indicators_array = [];
        var indicators_text_array = [];
        const indicators_options = ["single", "mo3", "ao5", "ao12", "ao25", "ao50", "ao100", "ao200", "ao1000"];
        
        //enable selected options and store to the array
        (async () => {
            var result = await browser.storage.sync.get(indicators_options);
            for (let item of indicators_options) {
                if(result[item]){
                    /*
                    var indicator 
                    if(item == "single"){
                        indicator = "1";
                    } else {
                        indicator = item.substr(2);
                    }
                    */
                    indicators_array.push(item);
                    //indicators_text_array.push(indicator);
                    console.log("now restoring option : ", item);
                }
            }
            console.log("restored options: ", indicators_array.join("/")); // e.g., "1/5/12/100"
            //indicator_text = indicators_text_array.join("/");
        })()

        //resoring format option...
        var formatOptionText ="";
        var customFormat = {};
        (async () => {
            var formatOptionObj = await browser.storage.sync.get(["formatOption", "formatCustomOption"]);
            formatOptionText = formatOptionObj.formatOption;
            customFormat = formatOptionObj.formatCustomOption;
            console.log("restore format option : ", formatOptionText);
            console.log("custom format option : ", formatOptionObj);
        })()

        console.log("restored complete!");

        //var text = "1/5/12/50/100 = ";
        
        //console.log("indicators text is set: ", indicator_text);

        setTimeout(function(){
            $(function() {
                //list every possible indicators
                const statElements = ['bs', 'bm0', 'ba1', 'ba2', 'ba3','ba4', 'ba5', 'ba6', 'ba7', 'ba8', 'ba9'];
                
                var times_array = [];
                for (let item of statElements) {
                    if(item !== null){
                        //console.log("scan stat of ", item);
                        var statObject = $("#stats > .statc td[data=" + item + "]");
                        if(statObject.length !== 0){
                            //console.log("td text : ", statObject.text());
                            var statLabel = statObject.parent().find("th").text(); //time, mo3, ao5, ao12, etc.
                            //console.log("th : ", statLabel);

                            //Convert "timer" to "single"
                            if(statLabel=="time") statLabel = "single"; //single, mo3, ao5, ao12, etc.

                            //Check if statLabel matches the elements in the indicators array
                            if(indicators_array.some(label => label === statLabel)){
                                if(statLabel == "single"){
                                    indicator = "1";
                                } else {
                                    indicator = statLabel.substr(2); //3, 5, 12
                                }

                                //convert the indicators as display texts based on the format option.                                
                                indicators_text_array.push(customFormat[indicator]);
                                times_array.push(statObject.text());
                                console.log("stat pushed:", statLabel);
                            }
                        }                        
                    }
                }
                outputStats = prefix_text + indicators_text_array.join("/") + " = " + times_array.join("/");
                console.log("output stats: ", outputStats);
                sendResponse(outputStats);
            });            
        }, 100);
        return true
    }
})

