$(document).ready(function() {
    $("#slider").slider({
        min: 0,
        max: 100,
        step: 1,
        range: true,
        values: [10, 90],
        slide: function(event, ui) {
            for (var i = 0; i < ui.values.length; ++i) {
                $("input.sliderValue[data-index=" + i + "]").val(ui.values[i]);
            }
        }
    });

    $("input.sliderValue").change(function() {
        var $this = $(this);
        $("#slider").slider("values", $this.data("index"), $this.val());
    });
    // $("#slider").css('background', 'rgb(0,255,0)');
    $("#slider .ui-slider-handle").css('color', 'rgb(0,255,0)');
});

$(() => {
    // Price range slider
    $("#slider").slider({
        min: 0,
        max: 400,
        step: 10,
        range: true,
        values: [50, 350],
        slide: function(event, ui) {
            for (var i = 0; i < ui.values.length; ++i) {
                $("input.sliderValue[data-index=" + i + "]").val(ui.values[i]);
            }
        }
    });

    $("input.sliderValue").change(function() {
        var $this = $(this);
        $("#slider").slider("values", $this.data("index"), $this.val());
    });


    $('#filter_form').submit((e) => {
        e.preventDefault();
        //Check category filter items
        let category = [];
        $.each($(".category_btn.active"), function() {
            category.push($(this).val())
        })
        if (category.length == 0) {
            $.each($(".category_btn"), function() {
                category.push($(this).val())
            })
        }
        let price = [];
        $.each($("input[name='price']"), function() {
            price.push($(this).val())
        })

        let age = [];
        $.each($("input[name='age']:checked"), function() {
            age.push($(this).val())
        });
        if (age.length == 0) {
            age.push('')
        }
        let filterObj = {
            category: category,
            price: price,
            age: age,
        }

        // ================================
        //  Post request, Filter Courses
        // ================================
        // ================================
        //  Filter Courses
        // ================================

        console.log(filterObj)
        axios.post('/display', { sorting: filterObj }).then((res) => {
            console.log(res.data)
            if (typeof res.data == 'string') {
                //error message at DisplayService.js
                $('#All_course_card').html(`<h5 class="text-center">${res.data}</h5>`)
            } else displayIndexCourses(image(edittedTime(res.data)))
        })

    });
})