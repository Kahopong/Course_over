$(() => {
    // Age range slider
    $("#slider").slider({
        min: 0,
        max: 100,
        step: 1,
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


    $('#filter_form').submit((e) => {
        e.preventDefault();
        console.log(e.currentTarget)
        let category = [];
        $.each($("input[name='category']:checked"), function() {
            category.push($(this).val())
        })
        if (category.length == 0) {
            $.each($("input[name='category']"), function() {
                category.push($(this).val())
            })
        }
        let price = [];
        $.each($("input[name='price']:checked"), function() {
            price.push($(this).val())
        })
        if (price.length == 0) {
            $.each($("input[name='price']"), function() {
                price.push($(this).val())
            })
        }
        let age = [];
        $.each($("input[name='age']:checked"), function() {
            age.push($(this).val())
        });
        if (age.length == 0) {
            $.each($("input[name='age']"), function() {
                age.push($(this).val())
            })
        }
        let filterObj = {
            category: category,
            price: price,
            age: age,
        }
        console.log(filterObj)
        axios.post('/display', { sorting: filterObj }).then((res) => {
            console.log(res.data)
        })

    });
})

// $(document).ready(function() {
//     $("button").click(function() {
//         var arr = [];
//         $.each($("input[name='language']:checked"), function() {
//             arr.push($(this).val());
//         });
//         alert("Your favourite programming languages are: " + arr.join(", "));
//     });
// });