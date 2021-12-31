// Hanlebars compile
const shopInfoTemplate = `
    <label> Company: </label>
    <input value="{{company}}"><br>
    <label> Email: </label>
    <input value="{{email}}"><br>
    <label> Tel: </label>
    <input value="{{tel}}"><br>
    <input type="submit" value="Trial Submit button, still cannot submit"><br> 
`
const shopInfoFunction = Handlebars.compile(shopInfoTemplate)

const courseEditTemplate = `
    <label> title: </label>
    <input name="title" value="{{title}}"><br>
    <label> category: </label>
    <input name="category" value="{{category}}"><br>
    <label> date: </label>
    <input name="date" value="{{date}}"><br>
    <label> quota: </label>
    <input name="quota" value="{{quota}}"><br>
    <label> price: </label>
    <input name="price" value="{{price}}"><br>
    <p>etc.......</p>
    <input type="submit" value="Test Submit button, not acutally submitting"><br>`

const courseEditFunction = Handlebars.compile(courseEditTemplate)

const listBookingTemplate = `
<thead>
    <tr class='header'>
        <th>Name</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Phone No.</th>
    </tr>
</thead>
<tbody>
{{#each booking}}
    <tr class='booking_row' data-id="{{id}}">
        <td>{{firstName}} {{surname}}</td>
        <td>{{sex}}</td>
        <td>{{age}}</td>
        <td>{{tel}}</td>
    </tr>
{{/each}}
</tbody>`


const listBookingFunction = Handlebars.compile(listBookingTemplate)

// Document on ready function
$(() => {
    //edit info shop
    axios.get('/info/shop').then((res) => {
        $("#edit_shop_form").html(shopInfoFunction(res.data[0]));
    })

    //add course
    $("#add_course_form").submit((e) => {
        e.preventDefault();
        let serializeArray = $("#add_course_form").serializeArray();
        let addCourse = serializeArray.reduce((obj, input) => {
            obj[input.name] = input.value
            return obj
        }, {})
        console.log(addCourse)

        axios.post('/host/shop', {
            add: addCourse
        }).then((res) => {
            // console.log(res.data)
            $('#success_add_msg').html(`Your course '${addCourse.title}' has been added`)
        })
    })

    //edit course
    //displaying orignal info
    axios.get('/host/shop').then((res) => {
        // console.log(res.data)
        let editCourse = res.data.find((course) => course.id == sessionStorage.getItem('edit_course_id'))
        $('#edit_course_form').html(courseEditFunction(editCourse))
        console.log(editCourse)
    })

    //Display booking details of a course
    axios.get(`/book/shop/${sessionStorage.getItem('course_id')}`).then((res) => {

        //Calculate age for each user
        let addAge = res.data.map((user) => {
            let dob = new Date(user.dob)
                //Shift the birth year to 1970, then calculate age
            let adjustYear = new Date(Date.now() - dob.getTime()).getUTCFullYear()
            let ageInput = Math.abs(adjustYear - 1970)
            user.age = ageInput
            return user
        })
        if (addAge.length === 0) {
            addAge = null
        }

        $('#list_booking_table').html(listBookingFunction({ booking: addAge }))
    })
})