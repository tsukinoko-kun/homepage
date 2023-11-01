import { listen } from "quicklink";

let quicklingStarted = false;

function startQuickling() {
    if (quicklingStarted) {
        return;
    }
    quicklingStarted = true;
    listen();
}

switch (document.readyState) {
    case "interactive":
    case "complete":
        listen();
        break;
    default:
        window.addEventListener("load", startQuickling);
        window.setTimeout(startQuickling, 5000);
        break;
}
