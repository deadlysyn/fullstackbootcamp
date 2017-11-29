/* simple echo function to ensure node command line
 * is working as expected.
 */

function echo(text, count) {
    if (!text) {
        console.log('"text" should not be an empty string');
    } else if (!count || count < 1) {
        console.log('"count" must be a positive integer');
    } else {
        for (var i = 0; i < count; i++) {
            console.log(text);
        }
    }
}

echo("test 1", 3)
echo("", 1)
echo("test 2", 0)
echo("test 3")
echo()
