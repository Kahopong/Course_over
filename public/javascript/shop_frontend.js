// make @index start from 1
Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

// Hanlebars compile
const shopInfoTemplate = `
  <div class="row1">
    <label for="CompanyN">Company Name</label><br>
    <input type="text" id="CompanyN" name="company" value="{{company}}">
  </div>

  <div class="row2">
      <label for="username">Email</label><br>
      <input type="email" id="email2" name="email" value="{{email}}">
  </div>

  <div class="row3">
      <label for="Tel2">Tel</label><br>
      <input type="tel" id="Tel2" name="tel" value="{{tel}}">
  </div>
  <a href="/dashboard"><input type="submit" class="btn btnSubmit"></a>
`;

const shopInfoFunction = Handlebars.compile(shopInfoTemplate);

const courseEditTemplate = `
<div class="grid-container">
          <div class="grid-item1">
            <label for="CourseT">Course Title:</label><br>
            <input type="text" id="CourseT" name="title" value="{{title}}"><br>
          </div>
          <div class="grid-item2">
            <label for="Category">Category:</label><br>
            <input type="text" id="Category" name="category" value="{{category}}"><br>
          </div>
          
          <div class="grid-item4">
            <label for="Date">Date:</label><br>
            <input type="date" id="Date" name="date" value="{{date}}"><br>
          </div>
          <div class="grid-item5">
            <label for="StartT">Start Time:</label><br>
            <input type="text" id="StartT" name="timeStart" value="{{timeStart}}"><br>
          </div>
          <div class="grid-item6">
            <label for="EndT">End Time:</label><br>
            <input type="text" id="EndT" name="timeEnd" value="{{timeEnd}}"><br>
          </div>
          <div class="grid-item7">
            <label for="AgeR">Age Range:</label><br>
            <input type="text" id="AgeR" name="ageRange" value="{{ageRange}}"><br>
          </div>
          <div class="grid-item8">
            <label for="Quota">Quota:</label><br>
            <input type="text" id="Quota" name="quota" value="{{quota}}"><br>
          </div>
          <div class="grid-item9">
            <label for="Price">Price:</label><br>
            <input type="text" id="Price" name="price" value="{{price}}"><br>
          </div>

      </div>

      <div class="CourseD">Course Detail</div>
      <hr>
      <div class="col-12 CourseD2">
          
      </div>
      <div class="CourseIm">Course Image</div>
      <hr>
      <div class="col-sm-9 CourseIm2">
          <label for="Banner">Banner:</label><br>
            <input type="file" id="Banner" name="Banner"><br>
            <label for="Pic1">Picture 1:</label><br>
            <input type="file" id="Pic1" name="Pic1"><br>
            <label for="Pic2">Picture 2:</label><br>
            <input type="file" id="Pic2" name="Pic2"><br>
            <label for="Pic3">Picture 3:</label><br>
            <input type="file" id="Pic3" name="Pic3"><br>

      </div>

      <a href="/dashboard"><input type="submit" class="btn btn-warning"></a>`;

const courseEditFunction = Handlebars.compile(courseEditTemplate);

const listBookingTemplate = `

<thead>
    <tr class='header'>
        <th>#</th>
        <th></th>
        <th>Name</th>
        <th>Sex</th>
        <th>Age</th>
        <th>Tel</th>
    </tr>
</thead>
<tbody>
{{#each booking}}
    <tr class='booking_row' data-id="{{id}}">
        <td><span>{{inc @index}}</span></td>
        <td><img class="avatar" src="/bookinglist_pic/avatar_3.png"></td>
        <td>{{firstName}} {{surname}}</td>
        <td>{{sex}}</td>
        <td>{{age}}</td>
        <td>{{tel}}</td>
    </tr>
{{/each}}
</tbody>`;

const listBookingFunction = Handlebars.compile(listBookingTemplate);

const edittedTimeShop = (res_data) => {
  res_data.date = res_data.date.split("T")[0];
  res_data.timeStart = res_data.timeStart.slice(0, -3);
  res_data.timeEnd = res_data.timeEnd.slice(0, -3);
  res_data.price = res_data.price.slice(0, -3);
  return res_data;
};

const courseParaTemplate = `<label for="AboutC">About the Course:</label><br>
<textarea type="text" id="AboutC" name="about" >{{about}}</textarea><br>
<label for="SpecN">Special Note:</label><br>
<textarea type="text" id="SpecN" name="specialNote" >{{specialNote}}</textarea><br>`;

const courseParaFunction = Handlebars.compile(courseParaTemplate);

// Document on ready function
$(() => {
  // =================================================================
  //display shop info in edit shop info page
  // =================================================================
  axios.get("/info/shop").then((res) => {
    $("#edit_shop_form").html(shopInfoFunction(res.data[0]));

    //shop info Edit Form submit
    $("#edit_shop").submit((e) => {
      e.preventDefault();
      console.log("enter to edit shop submit");
      let serializeArray = $("#edit_shop").serializeArray();
      // let generalInfo = serializeArray.slice(0, 8);
      // let paraInfo = serializeArray.slice(8);
      let editShop = serializeArray.reduce((obj, input) => {
        obj[input.name] = input.value;
        return obj;
      }, {});
      console.log(`edit shop`, editShop);

      axios
        .put(`/info/shop/`, {
          edit: editShop,
        })
        .then((res) => {
          $("#success_editshop_msg").html(
            `Your course '${editShop.company}' has been edited `
          );
        });
      window.location = "/dashboard";
    });
  });

  //add course
  $("#add_course_form").submit((e) => {
    e.preventDefault();
    let serializeArray = $("#add_course_form").serializeArray();
    console.log(serializeArray);
    let addCourse = serializeArray.reduce((obj, input) => {
      obj[input.name] = input.value;
      return obj;
    }, {});
    let ageCriteria = "";
    for (let i = 0; i < serializeArray.length; i++) {
      if (serializeArray[i].name == "Age") {
        ageCriteria += serializeArray[i].value;
        ageCriteria += ",";
      }
    }
    addCourse["Age"] = ageCriteria;
    console.log(addCourse);

    axios
      .post("/host/shop", {
        add: addCourse,
      })
      .then((res) => {
        console.log(res.data);
        $("#success_add_msg").html(
          `Your course '${addCourse.title}' has been added`
        );
      });
      window.location.href = '/dashboard'
  });

  //edit course
  //displaying orignal info
  axios.get("/host/shop").then((res) => {
    //Get Course para
    axios
      .get(`host/course_para/${sessionStorage.getItem("edit_course_id")}`)
      .then((res) => {
        $("#edit_course_form .CourseD2").html(courseParaFunction(res.data[0]));
      });

    //Course General Info

    let editCourse = res.data.find(
      (course) => course.id == sessionStorage.getItem("edit_course_id")
    );
    $("#edit_course_form").html(
      courseEditFunction(edittedTimeShop(editCourse))
    );
    console.log(editCourse);

    //Edit Form submit
    $("#edit_course_form").submit((e) => {
      e.preventDefault();
      let serializeArray = $("#edit_course_form").serializeArray();
      // let generalInfo = serializeArray.slice(0, 8);
      // let paraInfo = serializeArray.slice(8);
      let editCourse = serializeArray.reduce((obj, input) => {
        obj[input.name] = input.value;
        return obj;
      }, {});
      console.log(editCourse);

      axios
        .put(`/host/shop/${sessionStorage.getItem("edit_course_id")}`, {
          course: editCourse,
        })
        .then((res) => {
          $("#success_edit_msg").html(
            `Your course '${editCourse.title}' has been edited `
          );
        });

      axios
        .put(`/host/course_para/${sessionStorage.getItem("edit_course_id")}`, {
          para: editCourse,
        })
        .then((res) => {
          console.log("edited");
        });
      window.location = "/dashboard";
    });
  });

  //Display booking details of a course
  axios.get(`/book/shop/${sessionStorage.getItem("course_id")}`).then((res) => {
    //Calculate age for each user
    let addAge = res.data.map((user) => {
      let dob = new Date(user.dob);
      //Shift the birth year to 1970, then calculate age
      let adjustYear = new Date(Date.now() - dob.getTime()).getUTCFullYear();
      let ageInput = Math.abs(adjustYear - 1970);
      user.age = ageInput;
      return user;
    });
    if (addAge.length === 0) {
      addAge = null;
    }

    $("#list_booking_table").html(listBookingFunction({ booking: addAge }));
  });
});

const shopImageTemplate = `
<form action="/image/{{courseId}}" method='post' id='upload_form'  enctype="multipart/form-data">
   <label class='upload'>CHOOSE FILE
    <input type="file" accept="image/jpeg" name="upload" id="myFile"  value="Hello" />
    </label>
    <input class='submit' type="submit" value="UPLOAD" />
</form>`;

const shopImageFunction = Handlebars.compile(shopImageTemplate);

$(() => {
  $("#upload").html(
    shopImageFunction({ courseId: sessionStorage.getItem("course_id") })
  );
  console.log(sessionStorage.getItem("course_id"));
});
