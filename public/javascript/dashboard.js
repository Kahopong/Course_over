// Hanlebars compile
const coursesTemplate = `
{{#each course}}
    <tr class='table_row' data-id="{{id}}" data-title="{{title}}">
    <td class='title'><a href='/list_booking' class='nostyle'>{{title}}</a></td>
    <td>{{date}}</td>
    <td>{{bookNum}}/{{quota}}</td>
    <td>
    <button class='pic'><a href='/upload_pic' class='nostyle'>P</a></button>&nbsp;&nbsp;
    <button class='edit'><a href='/edit_course' class='nostyle'><i class="far fa-edit"></i></a></button>&nbsp;&nbsp;
    <button class='delete'><i class="fas fa-trash-alt"></i></button>
    </td>
    </tr>
{{/each}}`;
const coursesFunction = Handlebars.compile(coursesTemplate);

//Define display of courses at the table
const displayCourses = (data) => {
  $("#tbody").html(coursesFunction({ course: data }));
};
const edittedDate = (res_data) => {
  return res_data.map((x) => {
    x.date = x.date.split("T")[0];
    x.timeStart = x.timeStart.split(":").map((x) => parseInt(x));
    x.timeEnd = x.timeEnd.split(":").map((x) => parseInt(x));
    let min =
      (x.timeEnd[0] - x.timeStart[0]) * 60 + (x.timeEnd[1] - x.timeStart[1]);
    let hour = min / 60;
    x.duration = hour;
    return x;
  });
};

// Document on ready function
$(() => {
  axios.get("/info/shop").then((res) => {
    console.log("info shop", res.data);
    $("#company_name").html(res.data[0].company);
    $("#navbar_company_name").html(`Hello, ${res.data[0].company}!`);
  });

  axios
    .get("/host/shop")
    .then((res) => {
      // overall info at the top
      console.log(res.data);

      $("#listing_course_num").html(res.data.length);
      let courses = res.data;
      for (let i = 0; i < courses.length; i++) {
        let courseId = courses[i].id;
        axios
          .get(`/book/shop/${courseId}`)
          .then((res) => {
            let bookNum = res.data.length;
            courses[i].bookNum = bookNum;
          })
          .then(() => displayCourses(res.data));
      }
      //table body
      displayCourses(edittedDate(res.data));

      //Delete button click listener
      //To be confirmed (change status to 'Inactive')
      $("#tbody").on("click", ".delete", (event) => {
        let delete_id = $(event.currentTarget).closest(".table_row").data("id");
        let delete_title = $(event.currentTarget)
          .closest(".table_row")
          .data("title");
        axios
          .delete(`/host/shop/${delete_id}`)
          .then((res) => {
            let courses = res.data;
            for (let i = 0; i < courses.length; i++) {
              let courseId = courses[i].id;
              axios
                .get(`/book/shop/${courseId}`)
                .then((res) => {
                  let bookNum = res.data.length;
                  courses[i].bookNum = bookNum;
                })
                .then(() => displayCourses(res.data));
            }

            displayCourses(res.data);
            $("#delete_msg").html(
              `Your course '${delete_title}' is successfully deleted.`
            );
          })

          .catch((err) => console.log(err));
      });

      //Edit course info set edit_id, see shop_frontend.js
      $("#tbody").on("click", ".edit", (event) => {
        let edit_id = $(event.currentTarget).closest(".table_row").data("id");
        sessionStorage.setItem("edit_course_id", edit_id);
      });

      //Display booking details, set course_id, see shop_frontend.js
      $("#tbody").on("click", ".title", (event) => {
        let course_id = $(event.currentTarget).closest(".table_row").data("id");
        sessionStorage.setItem("course_id", course_id);
      });

      //Picture Upload id
      $("#tbody").on("click", ".pic", (event) => {
        let pic_id = $(event.currentTarget).closest(".table_row").data("id");
        sessionStorage.setItem("pic_id", pic_id);
      });
    })
    .catch((err) => console.log(err));
});
