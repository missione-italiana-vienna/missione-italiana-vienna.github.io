Compito periodico il primo Gennaio di ogni anno: 

(1) spostare solo gli eventi dell'anno precedente dal file 
     calendario/eventi.js 
al file 
     calendario/eventi_passati/eventi_YYYY.js  (da creare perché di norma non deve esistere prima del cambio di anno)
   
(2) aggiungere nel file
     calendario/eventi_passati/content.html
una riga relativa all'anno YYYY (o scommentare il relativo codice se già presente), con relativo link agli eventi passati dell'anno YYYY.

(3) controllare che il nuovo link funzioni correttamente (presupposto è aver creato correttamente il file al punto (1), e averlo già sincronizzato con github).

----

Un buon sito da usare per il calendario liturgico:

http://www.gcatholic.org/calendar/2024/General-E-it.htm

(cambiare l'anno nell'url a seconda dell'anno da cercare). Uniche cose da tenere in considerazione: il calendario sembra valido per l'Italia. Per l'Austria:
- il Corpus Domini è di giovedì (mentre in Italia è stato spostato sempre alla domenica successiva)
- festa di Pentecoste sia domenica (come in Italia) sia lunedì di Pentecoste (tecnicamente: 50 giorni dopo la Pasqua, quindi lunedì e non domenica)
- l'Ascensione è celebrata durante la settimana e non accorpata alla domenica successiva

--

Per default all'utente vengono mostrati a questo link

https://mcivienna.org/#!/calendario/

solo tutti gli eventi da ieri fino ai prossimi 360 giorni nel futuro. In questo modo (visto che per ogni box con la data sono mostrati solo giorno+mese), non si generano ambiguità sulla data.

Se invece un webmaster vuole controllare che TUTTI gli eventi inseriti per il futuro siano processati correttamente, si può usare invece questo link (pubblico ma non linkato da nessuna parte):

https://mcivienna.org/#!/calendario/?show_all_dates=yes
