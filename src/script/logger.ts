const debug = window.location.protocol !== "https:";

if (debug) {
  console.info("Debug logger enabled");
}

const parseError = (
  message: string | Event,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
): Array<any> => {
  if (typeof message === "string") {
    return [
      `Uncaught ${error ? error.name : "Error"} at ${source || "<anonymous>"}:${
        lineno ?? 0
      }:${colno ?? 0}`,
      error ? error.message : message,
    ];
  } else {
    return [
      `Uncaught ${error ? error.name : "Error"} at Event: ${message.type}`,
      message,
      message.target,
    ];
  }
};

window.onerror = function (message, source, lineno, colno, error) {
  if (debug) {
    console.error(...parseError(message, source, lineno, colno, error));
  } else {
    console.debug(...parseError(message, source, lineno, colno, error));
  }
  return true;
};
