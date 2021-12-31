// Hanlebars compile
const coursesTemplate = `
{{#each course}}
    <tr class='table_row' data-id="{{id}}" data-title="{{title}}">
    <td class='title'><a  href='/list_booking'>{{title}}</a></td>
    <td>{{date}}</td>
    <td>-1/{{quota}}</td>
    <td>
    <button class='edit'><a href='/edit_course'><i class="far fa-edit"></i></a></button>&nbsp;&nbsp;
    <button class='delete'><i class="fas fa-trash-alt"></i></button>
    </td>
    </tr>
{{/each}}`
const coursesFunction = Handlebars.compile(coursesTemplate)

//Define display of courses at the table
const displayCourses = (data) => {
    $('#tbody').html(coursesFunction({ course: data }))
}


// Document on ready function
$(() => {
    axios.get('/host/shop').then((res) => {

            // overall info at the top 
            // console.log(res.data)
            $("#company_name").html(res.data[0].company);
            $("#listing_course_num").html(res.data.length);

            //table body 
            displayCourses(res.data)

            //Delete button click listener
            //To be confirmed (change status to 'Inactive')
            $('#tbody').on('click', '.delete', (event) => {
                let delete_id = $(event.currentTarget).closest('.table_row').data('id')
                let delete_title = $(event.currentTarget).closest('.table_row').data('title');
                axios.delete(`/host/shop/${delete_id}`).then((res) => {
                    displayCourses(res.data)
                    $('#delete_msg').html(`Your course '${delete_title}' is successfully deleted.`)
                }).catch((err) => console.log(err))
            })

            //Edit course info set edit_id, see shop_frontend.js
            $('#tbody').on('click', '.edit', (event) => {
                let edit_id = $(event.currentTarget).closest('.table_row').data('id')
                sessionStorage.setItem('edit_course_id', edit_id)
            })

            //Display booking details, set course_id, see shop_frontend.js
            $('#tbody').on('click', '.title', (event) => {
                let course_id = $(event.currentTarget).closest('.table_row').data('id')
                sessionStorage.setItem('course_id', course_id)
            })

        })
        .catch((err) => console.log(err))

})