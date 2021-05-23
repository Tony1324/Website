window.addEventListener('load', () => {

    const nth = function(d) {
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

    var date = document.getElementById('date');
    var d = new Date();
    date.innerHTML = d.toDateString();
    document.getElementById('year').innerHTML = d.getFullYear();
    function progress() {
        let year = new Date(parseInt(d.getFullYear()), 0, 1);
        let prevYear = new Date(parseInt(d.getFullYear()) - 1, 0, 1);
        document.getElementById('year-progress').style.width = `${((Date.now() - prevYear.getTime()) /
            (year.getTime() - prevYear.getTime()) -
            1) *
            100}%`;
        document.getElementById('percent').innerHTML =
            Math.round(((Date.now() - prevYear.getTime()) / (year.getTime() - prevYear.getTime()) - 1) * 10000000000) /
            100000000;
    }

    function marchCount() {
        d = new Date();
        let march = new Date(2020, 2, 1);
        let diffDays = Math.ceil(Math.abs((march - d) / 86400000));
        document.getElementById('march-count').innerHTML = diffDays + nth(diffDays);
    }

    function eveCount() {
        let xmas = new Date(parseInt(d.getFullYear()), 11, 25);
        if (d.getMonth() == 11 && d.getDate() > 25) {
            xmas.setFullYear(xmas.getFullYear() + 1);
        }
        let eves = '';
        for (let i = 0; i < Math.ceil((xmas.getTime() - d.getTime()) / 86400000); i++) {
            eves += 'Eve ';
        }
        document.getElementById('eve-count').innerHTML = eves;
    }
    progress();
    marchCount();
    eveCount();
    setInterval(progress, 10);
    setInterval(eveCount, 3600000);
    setInterval(marchCount, 3600000);
});


