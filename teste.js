const puppeteer = require('puppeteer')
//const classe = require('./classe.js')

//const a = new classe.HorarioIndividual();

const actions = {
}


async function salvarFoto (username,password, user){
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=1001', { waitUntil: "domcontentloaded" });
  const USERNAME_SELECTOR = '#txtLogin';
  const PASSWORD_SELECTOR = '#txtSenha';
  const BUTTON_SELECTOR = '#btnOk';
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(password);
  await page.click(BUTTON_SELECTOR);
  await page.waitForNavigation();
    await page.click('#btnOK');
    await page.screenshot({path: `${user}.png`,
        clip: {x: 45, y:155, width: 104, height: 140}
    });

}
salvarFoto("20181045050068","132783")
firebase.storage().ref('images/'+"20181045050068").put("./20181045050068.png")