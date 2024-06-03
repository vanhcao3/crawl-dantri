const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');
const os = require('os');
const { format } = require('date-fns');

const pcName = os.hostname();
const currentDate = new Date();
const formattedDate = format(currentDate, 'yyyy/MM/dd');
const directoryPath = `C:/Users/${pcName}/news-please-repo/data/${formattedDate}/dantri.com.vn`;

const outputDir = 'output';
const outputFileName = format(currentDate, 'yyyy-MM-dd') + '.csv';
const outputCsvPath = path.join(outputDir, outputFileName);
const batchSize = 500; 

const seenTitles = new Set();
const seenDescriptions = new Set();
let totalRecords = 0;

function extractCategoryFromFilename(filename) {
  const parts = filename.split('_');
  return parts[0].replace(/-/g, ' ');
}

async function processFiles() {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = await fs.promises.readdir(directoryPath);
    const totalFiles = files.length;
    console.log(`Total files to process: ${totalFiles}`);

    for (let i = 0; i < totalFiles; i += batchSize) {
      const batchFiles = files.slice(i, i + batchSize);
      const records = [];

      for (const file of batchFiles) {
        const filePath = path.join(directoryPath, file);
        const data = await fs.promises.readFile(filePath, 'utf8');
        const $ = cheerio.load(data);

        const title = $('h1.title-page.detail').text().trim();
        const description = $('h2.singular-sapo').text().trim();
        const category = extractCategoryFromFilename(file);

        if (!title || !description) {
          continue;
        }

        if (seenTitles.has(title) || seenDescriptions.has(description)) {
          continue;
        }

        seenTitles.add(title);
        seenDescriptions.add(description);

        records.push({ title, description, category });
        totalRecords++;
      }

      const csv = new ObjectsToCsv(records);
      await csv.toDisk(outputCsvPath, { append: true });

      console.log(`Processed batch ${i / batchSize + 1} / ${Math.ceil(totalFiles / batchSize)}`);
    }

    console.log(`CSV file updated successfully. Total records appended: ${totalRecords}`);

  } catch (error) {
    console.error('Error processing files:', error);
  }
}

processFiles();
