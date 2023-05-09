export const TYPE_LOG = 'log';
export const TYPE_WARN = 'warn';
export const TYPE_ERROR = 'error';

function logger(log, type = TYPE_LOG){
    console[type]("module test: "+log);
}

export default logger;