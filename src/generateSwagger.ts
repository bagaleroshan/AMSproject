import swaggerJSDoc from 'swagger-jsdoc';
import * as fs from 'fs';
import * as path from 'path';

// Swagger definition
const swaggerDefinition = {
    info: {
        title: 'API Testing Documentation',
        version: '1.0.0',
        description: 'Documentation for testing API endpoints',
    },
    basePath: '/',
};

// Function to recursively get all files in a directory
const getFilesRecursively = (dir: string): string[] => {
    const files = fs.readdirSync(dir);
    let fileList: string[] = [];
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            fileList = [...fileList, ...getFilesRecursively(filePath)];
        } else if (filePath.endsWith('.ts')) {
            fileList.push(filePath);
        }
    });
    return fileList;
};

// Get all TypeScript files in the routes directory
const routeFiles = getFilesRecursively('./src/routes');

// Options for the swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: routeFiles,
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Save JSON file
const outputDir = './swagger';
const outputFile = path.join(outputDir, 'swagger.json');
fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2));
console.log(`Swagger JSON file saved to ${outputFile}`);
