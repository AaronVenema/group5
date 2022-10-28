document.addEventListener('DOMContentLoaded', function() {
var calendarEl = document.getElementById('calendar');
var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    dateClick: async function(date) {
        console.log(date.dateStr)
        // generate for
    },
    eventClick: async function(date) {

    },
    events: [
            // {
            //     id:"0",
            //     title: bill.name,
            //     start: bill.datecreated,
            //     ammount: bill.ammount,
            //     category: bill.category_id
            // }
        {
            id:"0",
            title: "groceries",
            start: "2022-10-28",
            ammount: 150,
            category: "food"
        }
    ]
});

calendar.render()

});
