chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.command == "getStats"){

        console.log("restoring options...");
        var prefix_text = "";
        chrome.storage.sync.get("prefix", function(value){
            prefix_text = value + "\n";
            console.log("restore prefix text : ", value);
        });

        var indicators_array = [];
        var indicators_text_array = [];
        const indicators_options = ["single", "mo3", "ao5", "ao12", "ao25", "ao50", "ao100", "ao200", "ao1000"];

        //enable selected options and store to the array
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
                    console.log("restore indicators options : ", item);
                }
            }
        });

        console.log("restoring options end.");

        //var text = "1/5/12/50/100 = ";
        var indicator_text = indicators_text_array.join("/");
        console.log("indicators text is set: ", indicator_text);
        setTimeout(function(){
            $(function() {
                //list every possible indicators
                const statElements = ['bs', 'ba1', 'ba2', 'ba3','ba4', 'ba5', 'ba6', 'ba7', 'ba8', 'ba9'];
                
                var arr = [];
                for (let item of statElements) {
                    if(item !== null){
                        var statObject = $("#stats > .statc td[data=" + item + "]");
                        var statLabel = statObject.parent().find("tr").text(); //time, mo3, ao5, ao12, etc.
                        if(statLabel=="time") statLabel = "single";
                        if(indicators_array.find(item => item === statLabel)){
                            arr.push(statObject.text());
                        }
                        
                    }                    
                }
                outputStats = prefix_text + indicator_text + " = " + arr.join("/");
                console.log("output stats: ", outputStats);
                sendResponse(outputStats);
            });            
        }, 100);
        return true
    }
})