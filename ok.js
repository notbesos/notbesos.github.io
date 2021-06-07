// arith

const arith_initial = document.getElementById("arith-initial")
const arith_cd = document.getElementById("arith-cd")
const arith_terms = document.getElementById("arith-terms")
const geo_initial = document.getElementById("geo-initial")
const geo_cd = document.getElementById("geo-cd")
const geo_terms = document.getElementById("geo-terms")

function arith_regenerate() {
    arith_terms.innerHTML = null
    let v = arith_initial.valueAsNumber
    let cd = arith_cd.valueAsNumber
    if (isNaN(v)) {
        v = 0
    }
    if (isNaN(cd)) {
        cd = 0
    }
    arith_terms.innerHTML = v
    for (let i = 0; i < 20; i++) {
        v += cd
        arith_terms.innerHTML += (', ' + v)
    }
    arith_terms.innerHTML += '...'
}

arith_cd.addEventListener('input', arith_regenerate)
arith_initial.addEventListener('input', arith_regenerate)

function geo_regenerate() {
   geo_terms.innerHTML = null
    let v = geo_initial.valueAsNumber
    let cd = geo_cd.valueAsNumber
    if (isNaN(v)) {
        v = 0
    }
    if (isNaN(cd)) {
        cd = 0
    }
    geo_terms.innerHTML = v
    for (let i = 0; i < 20; i++) {
        v *= cd
        geo_terms.innerHTML += (', ' + v)
    }
    geo_terms.innerHTML += '...'
}

geo_cd.addEventListener('input', geo_regenerate)
geo_initial.addEventListener('input', geo_regenerate)

arith_regenerate()
geo_regenerate()

// pascal
let numbers = [[1]]

for (let r = 0; r < 20; r++) {
    let newrow = []
    for (let i = 0; i < numbers[r].length + 1; i++) {
        let n = 0;
        if ((i - 1) >= 0) {
            n += numbers[r][i-1]
        }
        if (i < numbers[r].length) {
            n += numbers[r][i]
        }
        newrow.push(n)
    }
    numbers.push(newrow)
}

// construction
const construct_tri = document.getElementById("construct-tri")
const construct_flatten = document.getElementById("construct-flatten")
const reset_button = document.getElementById("construct-reset")
const add_row = document.getElementById("construct-add-row")
let flattened = false

let cons_row = 1
let cons_rows = [construct_tri.children[0]]

add_row.onclick = () => {
    if (cons_row > 10) {
        return
    }
    let newrow = document.createElement('div')
    newrow.classList = flattened ? 'construct-row-flat' : 'construct-row'
    let left_empty = document.createElement('p')
    let right_empty = document.createElement('p')
    left_empty.className = 'trinumber'
    right_empty.className = 'trinumber'
    newrow.appendChild(left_empty)
    let this_row = cons_row
    for (let i = 0; i < cons_row + 1; i++) {
        let p = document.createElement('p')
        p.className = 'trinumber'
        p.innerHTML = numbers[cons_row][i]
        newrow.appendChild(p)
        p.addEventListener('mouseover', () => {
            cons_rows[this_row - 1].children[i].style = 'background-color: #FFA400'
            if (cons_rows[this_row - 1].children[i].innerHTML == '') {
                cons_rows[this_row - 1].children[i].innerHTML = '(0)'
            }
            cons_rows[this_row - 1].children[i + 1].style = 'background-color: #FFA400'
            if (cons_rows[this_row - 1].children[i + 1].innerHTML == '') {
                cons_rows[this_row - 1].children[i + 1].innerHTML = '(0)'
            }
            p.style = 'background-color: #FF6A00'
        })
        p.addEventListener('mouseleave', () => {
            cons_rows[this_row - 1].children[i].style = null
            if (cons_rows[this_row - 1].children[i].innerHTML == '(0)') {
                cons_rows[this_row - 1].children[i].innerHTML = null
            }
            cons_rows[this_row - 1].children[i + 1].style = null
            if (cons_rows[this_row - 1].children[i + 1].innerHTML == '(0)') {
                cons_rows[this_row - 1].children[i + 1].innerHTML = null
            }
            p.style = null
        })
    }
    newrow.appendChild(right_empty)
    cons_rows.push(newrow)
    construct_tri.appendChild(newrow)
    cons_row++
}



reset_button.onclick = () => {
    cons_row = 1
    while(construct_tri.children.length > 1) {
        construct_tri.removeChild(construct_tri.children[1])
    }
    cons_rows = [construct_tri.children[0]]
}

// series & binom
const tri = document.getElementById("tri")
const binom = document.getElementById("binom")
const seqtext = document.getElementById("seq")
const swapbutton = document.getElementById("row-col-swap")

let rows = []
let colors = ['#FFA400', '#25D2BA', '#00AE96', '#3772D6', '#125BD7']
let colormap = {}
let selectedrow = 0
let bycol = false

for (let row = 0; row < 11; row++) {
    let newrow = document.createElement('div')
    newrow.className = flattened ? 'construct-row-flat' : 'construct-row'
    for (let col = 0; col < numbers[row].length; col++) {
        let p = document.createElement('p')
        p.className = 'trinumber'
        p.innerHTML = numbers[row][col]
        p.addEventListener('mouseenter', () => {
            if (!bycol) {
                return
            }
            for (rowel of rows) {
                if (col < rowel.children.length) {
                    rowel.children[col].style = 'background: #FF6A00'
                }
            }
            seqtext.innerHTML = null
            for (let i = 0; i < 11; i++) {
                seqtext.innerHTML += (numbers[i + col][col] + ' ')
            }
            if (col == 0) {
                binom.innerHTML = 'ones (column 0)'
            } else if (col == 1) {
                binom.innerHTML = 'counting numbers (column 1)'
            } else if (col == 2) {
                binom.innerHTML = 'triangular (column 2)'
            } else {
                binom.innerHTML = 'column '+ col
            }
        })
        p.addEventListener('mouseleave', () => {
            if (!bycol) {
                return
            }
            for (rowel of rows) {
                if (col < rowel.children.length) {
                    rowel.children[col].style = null
                }
            }
        })
        newrow.append(p)
    }
    newrow.addEventListener('mouseenter', () => {
        if (bycol) {
            return
        }
        seqtext.innerHTML = null
        newrow.style = 'background: #FF6A00'
        // go through
        let colori = 0
        for (let i = 0; i < newrow.children.length; i++) {
            const child = newrow.children[i]
            if (child.innerHTML != '1') {
                if (colormap[child.innerHTML] == null) {
                    child.style = 'background: ' + colors[colori]
                    colormap[child.innerHTML] = colors[colori]
                    colori++
                } else {
                    child.style = 'background: ' + colormap[child.innerHTML]
                }
            }
        }
        // generate polynomial from row
        if (row == 0) {
            // not possible
            binom.innerHTML = '(a + b)<sup>0</sup> = 1'
            return
        }
        let res = ''
        let a = row
        let b = 0
        for (const n of numbers[row]) {
            if (n != 1) {
                res += '<span style="background: '+ colormap[n] +'">' + n + '</span>'
            }
            if (a > 0) {
                res += 'a'
                if (a != 1) {
                    res += '<sup>'+a+'</sup>'
                }
            }
            if (b > 0) {
                res += 'b'
                if (b != 1) {
                    res += '<sup>'+b+'</sup>'
                }
            }
            res += ' + '
            a -= 1
            b += 1
        }
        binom.innerHTML = '(a + b)<sup>' + row + '</sup> = ' + res.substring(0, res.length - 3)
    })
    newrow.addEventListener('mouseleave', () => {
        newrow.style = ''
        for (let i = 0; i < newrow.children.length; i++) {
            newrow.children[i].style = null
        }
        colormap = {}
    })
    rows.push(newrow)
    tri.append(newrow)
}
/*
swapbutton.addEventListener('click', () => {
    bycol = !bycol
    if (bycol) {
        swapbutton.innerHTML = 'row mode'
    } else {
        swapbutton.innerHTML = 'column mode'
    }
})*/

construct_flatten.onclick = () => {
    flattened = !flattened
    if (flattened) {
        construct_flatten.innerHTML = 'unflatten'
        for (const row of cons_rows) {
            row.className = 'construct-row-flat'
        }
        for (const row of rows) {
            row.className = 'construct-row-flat'
        }
    } else {
        construct_flatten.innerHTML = 'flatten'
        for (const row of cons_rows) {
            row.className = 'construct-row'
        }
        for (const row of rows) {
            row.className = 'construct-row'
        }
    }
}
