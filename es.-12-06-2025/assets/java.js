 const numeriTotali = 90
    const numeriTabellina = 24
    let numeriEstratti = new Set()
    let tabelline = []
    const tabelloneDiv = document.getElementById('tabellone')
    const tabellineContainer = document.getElementById('tabellineContainer')

    function creaTabellone() {
      tabelloneDiv.innerHTML = ''
      for (let i = 1; i <= numeriTotali; i++) {
        const cella = document.createElement('div')
        cella.classList.add('cella')
        cella.id = 'cella-' + i
        cella.textContent = i
        tabelloneDiv.appendChild(cella)
      }
    }

    function iniziaPartita() {
      numeriEstratti.clear()
      creaTabellone()
      tabellineContainer.innerHTML = ''
      tabelline = []

      const num = parseInt(document.getElementById('numTabelline').value)
      for (let i = 0; i < num; i++) {
        const numeri = generaNumeriRandomUnici(numeriTabellina, 1, numeriTotali)
        tabelline.push(numeri)

        const tabDiv = document.createElement('div')
        tabDiv.classList.add('tabellina')
        numeri.forEach(n => {
          const cella = document.createElement('div')
          cella.classList.add('cella-tabellina')
          cella.id = `tabellina-${i}-num-${n}`
          cella.textContent = n
          tabDiv.appendChild(cella)
        }
    )

        tabellineContainer.appendChild(tabDiv)
      }
    }

    function estraiNumero() {
      if (numeriEstratti.size >= numeriTotali) {
        alert("Tutti i numeri sono stati estratti!")
        return
      }

      let numero;
      do {
        numero = Math.floor(Math.random() * numeriTotali) + 1
      } while (numeriEstratti.has(numero))

      numeriEstratti.add(numero)

      const cella = document.getElementById('cella-' + numero)
      if (cella) cella.classList.add('estratto')
        
      tabelline.forEach((numeriTab, index) => {
        if (numeriTab.includes(numero)) {
          const cellaTab = document.getElementById(`tabellina-${index}-num-${numero}`)
          if (cellaTab) cellaTab.classList.add('estratto')
        }
      }
    )
    }

    function resetTabellone() {
      numeriEstratti.clear()
      creaTabellone()
      tabelline.forEach((numeriTab, index) => {
        numeriTab.forEach(n => {
          const cella = document.getElementById(`tabellina-${index}-num-${n}`)
          if (cella) cella.classList.remove('estratto')
        }
    )
      }
    )
    }

    function generaNumeriRandomUnici(quanti, min, max) {
      const numeri = new Set()
      while (numeri.size < quanti) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min
        numeri.add(num)
      }
      return Array.from(numeri)
    }
    creaTabellone();