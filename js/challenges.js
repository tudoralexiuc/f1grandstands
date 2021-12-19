function displayChallenges() {
    (async () => {
        let challenges = await getChallenges()
        let high_score = challenges.body[0].high_score
        let total_score = challenges.body[0].total_score
        let high_scores = [100, 500, 1000, 5000]
        let total_scores = [500, 1000, 2500, 5000]
        let index_high = 0;
        let index_total = 0;
        document.getElementById("score").innerHTML += "<h1 style='color: #f66868'>High score: " + high_score + ", Total score: " + total_score + "</h1>"

        for (let i = 0; i < high_scores.length; i++) {
            if (high_score < high_scores[i]) {
                index_high = i;
                break;
            }
        }

        for (let i = 0; i < total_scores.length; i++) {
            if (total_score < total_scores[i]) {
                index_total = i;
                break;
            }
        }

        for (let i = index_high; i < high_scores.length; i++) {
            document.getElementById("rewardsContainer").innerHTML += "<h3>Achieve at least " + high_scores[i] +
                " points in a single game</h3><button style='color: red'>To do</button><hr>"
        }

        for (let i = index_total; i < total_scores.length; i++) {
            document.getElementById("rewardsContainer").innerHTML += "<h3>Achieve at least " + total_scores[i] +
                " points over all runs</h3><button style='color: red'>To do</button><hr>"
        }

        for (let i = 0; i < index_high; i++) {
            document.getElementById("rewardsContainer").innerHTML += "<h3>Achieve at least " + high_scores[i] +
                " points in a single game</h3><button style='color: green'>Done</button><hr>"
        }

        for (let i = 0; i < index_total; i++) {
            document.getElementById("rewardsContainer").innerHTML += "<h3>Achieve at least " + total_scores[i] +
                " points over all runs</h3><button style='color: green'>Done</button><hr>"
        }
    })();
}

async function getChallenges() {
    let challenges = await supabase
        .from('challenges')
        .select()
        .eq('user', supabase.auth.user().id)
    return challenges
}

displayChallenges()