chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.command == "getStats"){
        var prefix = "今日の3x3x3\n";
        var text = "1/5/12/50/100 = ";
        setTimeout(function(){
            $(function() {
                const statElements = ['bs', 'ba1', 'ba2', 'ba4', 'ba5'];
                
                var arr = [];
                for (let item of statElements) {
                    if(item !== null){
                        var statObject = $("#stats > .statc td[data=" + item + "]");
                        var statLabel = statObject.parent().find("tr").text(); //time, mo3, ao5, ao12, etc.
                        arr.push(statObject.text());
                    }                    
                }
                outputStats = prefix + text + arr.join("/");
                sendResponse(outputStats);
            });            
        }, 100);
        return true
    }
})