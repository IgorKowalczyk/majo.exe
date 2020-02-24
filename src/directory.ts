
import * as path from 'path';
import * as fs from 'fs';
import { readFileSync, writeFileSync } from 'jsonfile';

export const directory = path.resolve(__dirname, '..');

export const projectDir = (...args: string[]) => {
    return path.resolve(directory, ...args);
};

export const readJson = (...args: string[]) => {
    return readFileSync(projectDir(...args), { encoding: 'utf8' });
};

export const requireFile = (...args: string[]) => {
    return require(projectDir(...args));
};

export const readFile = (...args: string[]) => {
    return fs.readFileSync(projectDir(...args), { encoding: 'utf8' }); 
};

export const readDir = (...args: string[]) => {
    return fs.readdirSync(projectDir(...args)); 
};

export const writeFile = (data: any, ...args: string[]) => {
    return fs.writeFileSync(projectDir(...args), data, { encoding: 'utf8' }); 
};

export const writeJson = (data: any, ...args: string[]) => {
    return writeFileSync(projectDir(...args), data, { encoding: 'utf8' });
};

export const appendFile = (data: any, ...args: string[]) => {
    return fs.appendFileSync(projectDir(...args), data, { encoding: 'utf8' });
};

export const fileExists = (...args: string[]) => {
    return fs.existsSync(projectDir(...args));
};

export const deleteFile = (...args: string[]) => {
    let filepath = projectDir(...args);
    if(!fs.existsSync(filepath)) return;
    return fs.unlinkSync(filepath);
};
