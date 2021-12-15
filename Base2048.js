(function ($) // début du pluggin
{
    var score = 0;
    $.fn.game2048 = function () //function game2048 du pluggin
    {
        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generate_map() {
            var table = $('<table></table>');
            for (var y = 0; y < 4; y++) {
                var ligne = $('<tr></tr>');
                for (var x = 0; x < 4; x++) {
                    var cases = $('<td>0</td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    ligne.append(cases);
                }
                table.append(ligne);
            }
            return table;
        }

        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generate_case(cases) {
            for (var i = 0; i < cases; i++) {
                var x = Math.floor((Math.random() * 4));
                var y = Math.floor((Math.random() * 4));
                var value = 2 * (Math.floor((Math.random() * 2) + 1));
                var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');
                elem.css("background-color", "rgb(248, 203, 119)");

                if (value === 4 && Math.random() > 0.5)
                    value = 2;
                if (!elem[0])
                    generate_case(1);
                else {
                    elem.attr('nbr', value);
                    elem.text(value);
                }
            }
        }

        // fonction de gestion des évenements (appuie de touches)
        $('html').keydown(function (event) {
            switch (event['key']) {
                case 'ArrowLeft':
                    // insérer algo move left
                    console.log("Left");
                    moveLeft();
                    break;
                case 'ArrowUp':
                    // insérer algo move up
                    console.log("Up");
                    moveUp();
                    break;
                case 'ArrowRight':
                    // insérer algo move right
                    console.log("Right");
                    moveRight();
                    break;
                case 'ArrowDown':
                    // insérer algo move down
                    console.log("Down");
                    moveDown();
                    break;
            }
        });

        function moveLeft() {
            var moved = false;
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {
                    //console.log("Valeur de X:", x, "Valeur de Y:", y);
                    var elementA = $('[x="' + x + '"][y="' + y + '"]');
                    var valueA = elementA.attr("nbr");
                    console.log("elementA:", elementA);
                    if (valueA == 0) {
                        for (a = x + 1; a < 4; a++) {
                            var elementB = $('[x="' + a + '"][y="' + y + '"]');
                            var valueB = elementB.attr("nbr")
                            if (valueB == 0) {
                                continue;
                            }
                            else if (valueB != 0) {
                                moveCase(elementA, elementB, valueB);
                                moved = true;
                                x--;
                                break;
                            }
                        }
                    }
                    else if (valueA != 0) {
                        for (a = x + 1; a < 4; a++) {
                            var elementB = $('[x="' + a + '"][y="' + y + '"]');
                            var valueB = elementB.attr("nbr")
                            if (valueB == 0) {
                                continue;
                            }
                            else if (valueA != valueB) {
                                break;
                            }
                            else if (valueA == valueB) {
                                mergeCase(elementA, elementB, valueA)
                                moved = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (moved == true) {
                generate_case(1);
                moved == false;
            }
        }

        function moveRight() {
            var moved = false;
            for (var y = 0; y < 4; y++) {
                for (var x = 3; x >= 0; x--) {
                    //console.log("Valeur de X:", x, "Valeur de Y:", y);
                    var elementA = $('[x="' + x + '"][y="' + y + '"]');
                    var valueA = elementA.attr("nbr");
                    console.log("elementA:", elementA);
                    if (valueA == 0) {
                        for (a = x - 1; a >= 0; a--) {
                            var elementB = $('[x="' + a + '"][y="' + y + '"]');
                            var valueB = elementB.attr("nbr")
                            if (valueB == 0) {
                                continue;
                            }
                            else if (valueB != 0) {
                                moveCase(elementA, elementB, valueB);
                                moved = true;
                                x++;
                                break;
                            }
                        }
                    }
                    else if (valueA != 0) {
                        for (a = x - 1; a >= 0; a--) {
                            var elementB = $('[x="' + a + '"][y="' + y + '"]');
                            var valueB = elementB.attr("nbr")
                            if (valueB == 0) {
                                continue;
                            }
                            else if (valueA != valueB) {
                                break;
                            }
                            else if (valueA == valueB) {
                                mergeCase(elementA, elementB, valueA)
                                moved = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (moved == true) {
                generate_case(1);
                moved == false;
            }
        }

        function moveUp() {
            var moved = false;
            for (var x = 0; x < 4; x++) {
                for (var y = 0; y < 4; y++) {
                    //console.log("Valeur de X:", x, "Valeur de Y:", y);
                    var elementA = $('[x="' + x + '"][y="' + y + '"]');
                    var valueA = elementA.attr("nbr");
                    console.log("elementA:", elementA);
                    if (valueA == 0) {
                        for (a = y + 1; a < 4; a++) {
                            var elementB = $('[x="' + x + '"][y="' + a + '"]');
                            var valueB = elementB.attr("nbr")
                            if (valueB == 0) {
                                continue;
                            }
                            else if (valueB != 0) {
                                moveCase(elementA, elementB, valueB);
                                moved = true;
                                y--;
                                break;
                            }
                        }
                    }
                    else if (valueA != 0) {
                        for (a = y + 1; a < 4; a++) {
                            var elementB = $('[x="' + x + '"][y="' + a + '"]');
                            var valueB = elementB.attr("nbr")
                            if (valueB == 0) {
                                continue;
                            }
                            else if (valueA != valueB) {
                                break;
                            }
                            else if (valueA == valueB) {
                                mergeCase(elementA, elementB, valueA)
                                moved = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (moved == true) {
                generate_case(1);
                moved == false;
            }
        }

        function moveDown() {
            var moved = false;
            for (var x = 0; x < 4; x++) {
                for (var y = 3; y >= 0; y--) {
                    //console.log("Valeur de X:", x, "Valeur de Y:", y);
                    var elementA = $('[x="' + x + '"][y="' + y + '"]');
                    var valueA = elementA.attr("nbr");
                    console.log("elementA:", elementA);
                    if (valueA == 0) {
                        for (a = y - 1; a >= 0; a--) {
                            var elementB = $('[x="' + x + '"][y="' + a + '"]');
                            var valueB = elementB.attr("nbr")
                            if (valueB == 0) {
                                continue;
                            }
                            else if (valueB != 0) {
                                moveCase(elementA, elementB, valueB);
                                moved = true;
                                y++;
                                break;
                            }
                        }
                    }
                    else if (valueA != 0) {
                        for (a = y - 1; a >= 0; a--) {
                            var elementB = $('[x="' + x + '"][y="' + a + '"]');
                            var valueB = elementB.attr("nbr")
                            if (valueB == 0) {
                                continue;
                            }
                            else if (valueA != valueB) {
                                break;
                            }
                            else if (valueA == valueB) {
                                mergeCase(elementA, elementB, valueA)
                                moved = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (moved == true) {
                generate_case(1);
                moved == false;
            }
        }

        function moveCase(elementA, elementB, valueB) {
            elementA.attr("nbr", valueB);
            elementA.text(valueB);
            elementA.css("background-color", "rgb(248, 203, 119)");
            elementB.attr("nbr", 0);
            elementB.text("0");
            elementB.css("background-color", "rgb(246, 234, 211)");
        }

        function mergeCase(elementA, elementB, valueA) {
            var mergeValue = valueA * 2
            elementA.attr("nbr", mergeValue);
            elementA.text(mergeValue);
            elementA.css("background-color", "rgb(248, 203, 119)");
            elementB.attr("nbr", 0);
            elementB.text("0");
            elementB.css("background-color", "rgb(246, 234, 211)");
            if (mergeValue == 2048) {
                $(".Win").append('You Win !');
                elementA.css("background-color", "#ff6702");
            }
            score += 1;
            console.log("scoremerge", score);
            // $(".Score").append(score);
            $(".Score").html("Your score : " + score);
        }



        // début du code lancé
        $(this).append(generate_map()); // génération du tableau vide
        generate_case(2); // génération aléatoire de deux cases pleines (2 ou 4)
    }

})(jQuery); // fin du pluggin