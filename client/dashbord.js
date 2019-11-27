const addDaysByweek = () => {
    const todayDate = new Date(),
        dayToday = todayDate.setDate(todayDate.getDate() + 1)

    // add date for all days

    Array.from(document.querySelectorAll('div')).map((el) => {
        if (Number(el.getAttribute("id") >= 0)) {
            const div = document.createElement('div');
            const dateByDay = todayDate.getDate() - todayDate.getDay() + Number(el.getAttribute("id"));
            const month = todayDate.getMonth();
            const year = todayDate.getFullYear();
            div.innerHTML = `${dateByDay}/${month}/${year}`;
            el.appendChild(div);

            // fetch agenda day from api
            (async() => {

                await fetch('http://localhost:3001/getDayAgendaByDate', {
                        method: 'post',
                        body: JSON.stringify({
                            date: `${dateByDay}/${month}/${year}`
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(myJson) {
                        console.log(myJson);
                        myJson.forEach(element => {
                            console.log(element);
                        });
                    });
            })();
        }
    });

};
window.addEventListener('load', function() {
    addDaysByweek();
});