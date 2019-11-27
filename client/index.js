const fields = {
    "fields": [{
            "class": ["ז1", "ז2", "ז3", "ח1", "ח2", "ח3"]
        },
        {
            "teachers": ["David", "Moshe", "Israel", "Tali", "Noa"]
        },
        {
            "lessons": ["09-10", "10-11", "11-12", "12-13", "13-14"]
        }
    ]
};
let dataDay;
const getAgendaByDate = async() => {
    const date_field = await document.getElementById("date_input").value;
    const hour_field = document.getElementById("hour").value;
    console.log(date_field);

    await fetch('http://localhost:3001/getDayAgenda', {
            method: 'post',
            body: JSON.stringify({
                date: date_field,
                hour: hour_field
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(myJson) {
            const jsonText = myJson;
            const agendaList = document.getElementById("agenda_list");
            const total_qty = document.getElementById("total_qty");
            const comp_qty = document.getElementById("comp_qty");
            const hour_rent = document.getElementById("hour");
            const hour_choosed = hour_rent.options[hour_rent.selectedIndex];
            let total = 0;
            agendaList.innerHTML = '';
            myJson.forEach(element => {
                let node_li = document.createElement("li");
                agendaList.appendChild(node_li);
                node_li.append(element.teacher_name, " ", element.class, " ", element.lesson, " qty:", element.qty, " ");
                total += parseInt(element.qty);

            });
            if (total > 0) {
                total_qty.innerHTML = '';
                total_qty.append(total);
                hour_choosed.append("  ");
                hour_choosed.innerHTML = hour_choosed.value + `<p id='availblity_id' > Availbilty: ${50 - total} </p>`;

            }
            comp_qty.setAttribute("max", 50 - total);
            dataDay = jsonText;

        });

}
const calcCompPerHouer = () => {
    let counter = 0;
    console.log(dataDay[0]);
    dataDay.forEach(element => {
        counter += element["qty"];
    });
    getAgendaByDate();
}

const insertFieldsContent = () => {
    const select = document.getElementById("teacher_select");
    fields["fields"][1]["teachers"].forEach((element) => {
        let option = document.createElement("option");
        option.text = element;
        select.add(option);
    })

}

const validateForm = () => {
    var x = document.forms["registerForm"]["comp_qty"].value;
    if (x == 0) {
        alert("qty must be more then 0");
        return false;
    }
}