// Get the root element
const r = document.querySelector(':root');
let theme = -10

    if (localStorage.key(0) == null) {
        theme = 0;
    }
    if (localStorage.key(0) != null) {
        theme = localStorage.key(0) 
    }
    setTheme()

function changeTheme() {
    theme = theme + 1;
    setTheme()
}

function setTheme() {
    if (theme >= 3) {
        theme = 0;
    }
    if (theme == 0) {
        main()
    }
    if (theme == 1) {
        moon()
    }
    if (theme == 2) {
        dawn()
    }
    localStorage.clear()
    localStorage.setItem(theme, 0)
}

function main() {
  r.style.setProperty('--bkg-clr', '#191724');
  r.style.setProperty('--lnk-clr', '#c4a7e7');
  r.style.setProperty('--txt-clr', '#e0def4');
  r.style.setProperty('--line-clr', '#524f67');
  r.style.setProperty('--h2-clr', '#6e6a86');
}

function moon() {
  r.style.setProperty('--bkg-clr', '#232136');
  r.style.setProperty('--lnk-clr', '#c4a7e7');
  r.style.setProperty('--txt-clr', '#e0def4');
  r.style.setProperty('--line-clr', '#56526e');
  r.style.setProperty('--h2-clr', '#6e6a86');
}

function dawn() {
  r.style.setProperty('--bkg-clr', '#faf4ed');
  r.style.setProperty('--lnk-clr', '#907aa9');
  r.style.setProperty('--txt-clr', '#575279');
  r.style.setProperty('--line-clr', '#cecacd');
  r.style.setProperty('--h2-clr', '#9893a5');
}

