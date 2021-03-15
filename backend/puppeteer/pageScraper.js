const scraperObject = {
    async scraper(browser, barcode){
        const url = 'https://www.barcodelookup.com/' + barcode;
        let page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
        await page.goto(url);
        let object = []
        
        const error = await page.$('#body-container > section.mid-inner.content-pages > div > div > div > div > center > h2');
        const error2 = await page.$('#body-container > section.jumbotron.top.short-banner.inner > div > h1');
        
        if(!error&&!error2) {
            await page.waitForSelector('#body-container > section.mid-inner > div > div > div.col-md-6.product-details > h4')
            let element = await page.$('#body-container > section.mid-inner > div > div > div.col-md-6.product-details > h4')
            let title = await page.evaluate(el => el.textContent, element)

            await page.waitForSelector('#body-container > section.mid-inner > div > div > div.col-md-6.product-details > div:nth-child(5) > div > div:nth-child(2) > div > div > span');
            element = await page.$('#body-container > section.mid-inner > div > div > div.col-md-6.product-details > div:nth-child(5) > div > div:nth-child(2) > div > div > span');
            let category = await page.evaluate(el => el.textContent, element)

            await page.waitForSelector('#img_preview')
            element = await page.$('#img_preview')
            let imageURL = await page.evaluate(el => el.getAttribute('src'), element)

            object = {
                title: title,
                categories: category,
                imageURL: imageURL
            }
        } else {
            console.log('Failed to find image by barcode')
        }

        return object;
    }
}

module.exports = scraperObject;