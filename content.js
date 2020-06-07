chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.command == "getStats"){

        //restoring prefix option...
        console.log("restoring options...");
        var prefix_text = "";
        
        (async () => {
            var prefixObj = await browser.storage.sync.get("prefix");
            prefix_text = prefixObj.prefix;
            console.log("restore .prefix text : ", prefix_text);
        })()

        /*
        chrome.storage.sync.get("prefix", function(value){
            prefix_text = value + "\n";
            console.log("restore prefix text : ", value);
        });
        */

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
                    var indicator 
                    if(item == "single"){
                        indicator = "1";
                    } else {
                        indicator = item.substr(2);
                    }
                    indicators_array.push(item);
                    indicators_text_array.push(indicator);
                    console.log("now restoring option : ", item);
                }
            }
            console.log("restored options: ", indicators_text_array);
            indicator_text = indicators_text_array.join("/");
        })()
        /*
        chrome.storage.sync.get(indicators_options, function(value){
            for (let item of indicators_options) {
                if(value[item]){
                    var indicator 
                    if(item == "single"){
                        indicator = "1";
                    } else {
                        indicator = item.substr(2);
                    }
                    indicators_array.push(item);
                    indicators_text_array.push(indicator);
                    console.log("now restoring option : ", item);
                }
            }
            console.log("restored options: ", indicators_text_array);
        });*/

        console.log("restored complete!");

        //var text = "1/5/12/50/100 = ";
        
        console.log("indicators text is set: ", indicator_text);
        setTimeout(function(){
            $(function() {
                //list every possible indicators
                const statElements = ['bs', 'bm0', 'ba1', 'ba2', 'ba3','ba4', 'ba5', 'ba6', 'ba7', 'ba8', 'ba9'];
                
                var arr = [];
                for (let item of statElements) {
                    if(item !== null){
                        console.log("scan stat of ", item);
                        var statObject = $("#stats > .statc td[data=" + item + "]");
                        console.log("td text : ", statObject.text());
                        var statLabel = statObject.parent().find("th").text(); //time, mo3, ao5, ao12, etc.
                        console.log("th : ", statLabel);
                        if(statLabel=="time") statLabel = "single";
                        if(indicators_array.some(item => item === statLabel)){
                            arr.push(statObject.text());
                            console.log("stat pushed:", statLabel);
                        }
                        
                    }
                }
                outputStats = prefix_text + "\n" + indicator_text + " = " + arr.join("/");
                console.log("output stats: ", outputStats);
                sendResponse(outputStats);
            });            
        }, 100);
        return true
    }
})