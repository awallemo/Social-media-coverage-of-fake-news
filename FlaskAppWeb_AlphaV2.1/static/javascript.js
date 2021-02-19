//Creating global variable that stores the dictionary pulled from the Twitter API storing all of the data from the tweets.
var allData;
var allDates = [];
var newalldates  =[];
//Sett en tweet/retweet til value og datoen(tiden) til key.
var amountdict = {};

//EventListener that calls the function start() when the site is loaded
window.addEventListener('DOMContentLoaded', () => start(), false);


// Async function that starts by fetching the data from the json response in the fetch() function. The fetch() function sets the allData variable to the dictionary with all of the data. 
// After the allData variable is set, we extract the public_metrics by the transform_data() function. It returns a list that is used as the parameter for plotting the chart by the chart() function.
async function start() {
    fetchdata().then(() => {
        console.log(allData);
        list = transform_data(allData);
        console.log(list);
        created_at();
        chart(list);
        linechart(newalldates);

    }, false);
};

// Fetching the json response and setting it as the global allData variable.
async function fetchdata() {
    return fetch('http://127.0.0.1:5000/showinfo')
        .then(response => response.json())
        .then(data => {
            allData = data.data
        });
};

//Dividing the data before putting it into the linechart.

/**function divideData(allData){
    //sett tid til key og tweeten til value.
    for (let i = 0; i < allData.length; i++){
        amountdict[allData[i]["created_at"]] = allData[i]["id"]
    }
    sorteddata = allData.sort(function(a,b){
        return b.created_at-a.created_at
    })
    
}**/

//showing/hiding bar-DIV
function barCanvas() {
    var x = document.getElementById("barCanvas");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


// Plotting the allData in the form of a bar chart
function chart(allData) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Retweets', 'Likes', 'Reply', 'Quote'],
            datasets: [{
                label: '#',
                data: allData,
                backgroundColor: [
                    'red',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 5
            }]
        },
        options: {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};
//plotting linechart of the tweets that were created. 
function linechart(allDates) {
    //divideData(allData)
    
    for (let i = 0; i < allDates.length; i++){
    var ctx = document.getElementById('LineChart').getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        options: {
            scales: {
              xAxes: [{
                type: 'time'
              }]
            }
          },
          data: {
            labels: [allDates[i]],
            datasets: [{
              label: 'Demo',
              data: [{
                  t: allDates[i],
                  y: i
                }],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          }
        });
    }
}

// Extracting the public metrics from allData
// The API returns 100 tweets that can be in the format for a orignal tweet, a reply to a tweet, a quote of a tweet or a retweet of a tweet
// The problem with the API is that most of 100 tweets we get from the API is retweets from another tweet
// A retweet only has the "retweet_count" from the orignal tweet
function transform_data(allData) {
    let total_retweets = 0
    let total_likes = 0
    let total_replies = 0
    let total_quotes = 0

    for (let i = 0; i < allData.length; i++) {
        if ("referenced_tweets" in allData[i]) {
            if (allData[i]['referenced_tweets']['0']["type"] !== "retweeted") {
                total_retweets += allData[i]['public_metrics']["retweet_count"]
                total_likes += allData[i]['public_metrics']["like_count"]
                total_replies += allData[i]['public_metrics']["reply_count"]
                total_quotes += allData[i]['public_metrics']["quote_count"]

            }
        } else {
            total_retweets += allData[i]['public_metrics']["retweet_count"]
            total_likes += allData[i]['public_metrics']["like_count"]
            total_quotes += allData[i]['public_metrics']["quote_count"]
            total_replies += allData[i]['public_metrics']["reply_count"]
        }
    }

    var total_list = [total_retweets, total_likes, total_quotes, total_replies]
    return total_list
};

//finding how many tweets was tweetet in the last 7 days.
function findAmountOfTweets() {
    allDates.sort()
    var current = null;
    var cnt = 0;
    for (var i = 0; i < allDates.length; i++) {
        if (allDates[i] != current) {
            if (cnt > 0) {
                document.write(current + ' comes --> ' + cnt + ' times<br>');
            }
            current = allDates[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        document.write(current + ' comes --> ' + cnt + ' times');
    }

}


function created_at() {
    
    for (let i = 0; i < allData.length; i++) {
        const element = allData[i]["created_at"];
        allDates.push(element)
        
    }
    for (let i = 0; i < allDates.length; i++){
        allDates[i] = allDates[i].replace("T", " ")
        allDates[i] = allDates[i].replace(".000Z", "")
        console.log(allDates[i])
        newalldates.push(new Date(allDates[i])) 
    }
    
    console.log("ALLDATES " + newalldates)
}

// a function call of that calls on the api