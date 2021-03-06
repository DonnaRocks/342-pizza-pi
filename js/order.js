"use strict";

// function toggleField(elementId) {
//     $("#" + elementId).removeClass("hidden");

    // let ele = window.document.getElementById(elementId);
    // ele.style.display = "block !important;";

// }

// document.getElementById("crust-choice")
//     .addEventListener('change', function(){
//         console.log(document.getElementById("pizza-size-container"));
//     });

$(document).ready(function($){
    let pizzaOrder = getOrder();

    check(pizzaOrder);

    $("#crust-choice").on("change", function(e){
        $("#pizza-size-container").removeClass("hidden");
    });

    $("#pizza-size").on("change", function(e){
        $(".toppings-container").removeClass("hidden");
    });

    $(".pizza-updater").on("change", function(e){
        let fieldName = $(this).attr('name');
        pizzaOrder[fieldName] = $(this).val();
        saveOrder(pizzaOrder);
    });
});

function createOrder() {
    return {
        crust: null,
        size: null,
        price: 0.00,
        toppingsMeat: [],
        toppingsMisc: []
    };
}

function saveOrder(pizzaOrder) {
    localStorage.pizza_order = JSON.stringify(pizzaOrder);
    localStorage.pizza_changes = JSON.stringify(pizzaOrder);
}

function getOrder() {
    return (localStorage['pizza_order'])
        ? JSON.parse(localStorage['pizza_order'])
        : createOrder();
}

function getChanges() {
    return (localStorage["pizza_changes"])
    ? JSON.parse(localStorage["pizza_changes"])
        : createOrder();
}

function check(order){
    for (let choice in order){
        let picks = order[choice];
        if (picks == null || picks == [] || picks >= 0.00){
            continue;
        } else if (picks == "thin" || picks == "deep"){
            $("#crust-choice").val(picks).find("option[picks]").attr("selected", true);
            $("#pizza-size-container").removeClass("hidden");
        } else if (picks == "sm" || picks == "md" || picks == "lg"){
            $("#pizza-size").val(picks).find("option[picks]").attr("selected", true);
            $(".toppings-container").removeClass("hidden");
            $(".price-reset-section").removeClass("hidden");
        } else if (picks){
            for (let pick of picks){
                if (pick != ""){
                    $("#" + pick).attr("checked", true);
                }
            }
        } cost(order);

    }
}

function cost(order){
    order.price = 0.00;
    switch (order.crust){
        case "thin":
            order.price += 10.00;
            break;

        case "deep":
            order.price += 15.00;
            break;
    };

    switch (order.size){
        case "sm":
            break;

        case "md":
            order.price += 2.00;
            break;

        case "lg":
            order.price += 4.00;
            break;
    };

    if (order.toppingsMeat !== null){
        for (let topping of order.toppingsMeat){
            switch(topping){
                case "meat-lover":
                    order.price += 4.50;
                    break;

                case "ham":
                case "chicken":
                    order.price += 2.50;
                    break;

                case "bacon":
                case "pepperoni":
                case "sausage":
                    order.price += 1.75;
                    break;
            };
        };
    };

    if (order.toppingsMisc !== null){
        for (let topping of order.toppingMisc()){
            order.price += 1.00;
        };
    };

    add(order.price);
}

function add(price){
    $(".price-container h4").remove();
    let $newprice = ("<h4>".text("COST: $" + price.toFixed(2)));
    $(".price-container").append($newPrice);

};