function initInput( ){
    document.addEventListener('keydown', function(event) {
        switch( event.keyCode ){
            case 37:
                keyboards.left = true;
                break;
            case 39:
                keyboards.right = true;
                break;
            case 38:
                keyboards.up = true;
                break;
            case 40:
                keyboards.down= true;
                break;

            case 65:
                keyboards.A = true;
                break;
            case 68:
                keyboards.D = true;
                break;
            case 87:
                keyboards.W = true;
                break;
            case 83:
                keyboards.S = true;
                break;

        }
    });
    document.addEventListener('keyup', function(event) {
        switch( event.keyCode ){
            case 37:
                keyboards.left = false;
                break;
            case 39:
                keyboards.right = false;
                break;
            case 38:
                keyboards.up = false;
                break;
            case 40:
                keyboards.down= false;
                break;

            case 65:
                keyboards.A = false;
                break;
            case 68:
                keyboards.D = false;
                break;
            case 87:
                keyboards.W = false;
                break;
            case 83:
                keyboards.S = false;
                break;
        }
    });
}