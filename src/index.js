
const puppeteer = require('puppeteer');
const express = require("express");
const app = express()




app.get("/", async (req, res)=>{
  
  res.send(await request())

})

app.listen(8080)

async function request(){

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://impostometro.com.br/widget/contador');
  await page.waitForTimeout(500);

  const req = await page.$$eval('.counter .counter-inside', (el) => {
    
    let tot = []
    
    for (let i = 0; i < el.length; i++) {
      tot.push(el[i].innerText)
    }
    
    return tot
  })

  await browser.close()

  const string = req.join("") // Trasformando em string 

  const stringSemCentavos = string.slice(0, -2) // Tirando centavos

  const stringTan = string.length-2 // sabendo qual o tamanho do numero sem os centavos

  const centavos = req.join("").slice(stringTan) // puxando só os centavos

  const stringComSentavos = stringSemCentavos + "." + centavos
  
  const number = Number(stringComSentavos)


  return number.toLocaleString()
}
