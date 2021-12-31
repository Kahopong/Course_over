const ListAllshopTemplate =
  ` {{#each course}}
  <div class='card-container col-lg-4'>
      <div class="card">
          <img class="card-img-top" src="./lego.jpeg" alt="card-img-cap">
          <div class="card-body">
              <h5 class="card-title"><a href="/index/course">{{title}}</a></h5>
              <h6 class="card-subtitle mb-2 text-muted">{{category}}</h6>
              <div>
                  <span class="card-text float-left"><i class="far fa-clock"></i>&nbsp;&nbsp;{{duration}}</span>
                  <span class="card-text float-right"> {{price}}</span>
              </div>
          </div>
      </div>
  </div>
  {{/each}}`
  const ListAllShopFunction = Handlebars.compile(ListAllshopTemplate)

  const displayCourses = (data) => {
    $('#All_course_card').html(ListAllShopFunction({ course: data }))
}

$(() => {
    axios
      .get("/display")
      .then((res) => {
        // overall info at the top
        // console.log(in axios);
      res.data = res.data.map((x) => {
        x.date = x.date.split("T")[0];
        x.timeStart = x.timeStart.split(":").map((x) => parseInt(x));
        x.timeEnd = x.timeEnd.split(":").map((x) => parseInt(x));
        let min =
          (x.timeEnd[0] - x.timeStart[0]) * 60 +
          (x.timeEnd[1] - x.timeStart[1]);
        let hour = min / 60;
        x.duration = hour;
        // x.timeEnd = x.timeEnd.slice(0, -3);
        return x;
      });
        //insert data into handlebars
        displayCourses(res.data);
        console.log(res.data);
      })
      $('.card-body').on('click', '.card_title', (event) => {
        let course_id = $(event.currentTarget).closest('.table_row').data('id')
        sessionStorage.setItem('course_id', course_id)
    })
      .catch((err) => console.log(err));
  });
