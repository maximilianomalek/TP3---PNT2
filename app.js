new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo=100;
            this.turnos = [];
        },
        atacar: function () {
            var danio=this.calcularHeridas(3,10);
            this.saludMonstruo -= danio;
            this.turnos.unshift({
                esJugador: true,
                text: 'El jugador golpea al monstruo por ' + danio + '%'
            })
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var danio = this.calcularHeridas(10,20);
            this.saludMonstruo -= danio;
            this.turnos.unshift({
                esJugador: true,
                text: 'El jugador golpea al monstruo por ' + danio + '%'
            })
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();


        },

        curar: function () {
            if (this.saludJugador<=90) {
                this.saludJugador+=10;
                this.turnos.unshift({
                    esJugador: true,
                    text: 'Te curaste en un ' + '10%'
                })

            }else{
                this.saludJugador = 100;
                this.turnos.unshift({
                    esJugador: true,
                    text: 'Estas curado al ' + '100%'
                })
            }


             this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            var danio = this.calcularHeridas(5,12);
            this.saludJugador -= danio;
            this.turnos.unshift({
                esJugador:false,
                text:'El monstruo lastima al jugador en ' + danio + '%'
            })
            this.verificarGanador();
        },

        calcularHeridas: function (a,b) {
            return Math.max(Math.floor(Math.random()*b)+1,a);

        },
        verificarGanador: function () {
            if (this.saludMonstruo<=0) {
                if (confirm('Ganaste! Jugar de nuevo?')) {
                    this.empezarPartida();                    
                } else{
                    this.hayUnaPartidaEnJuego=false;
                }
                return true;
            } else if (this.saludJugador<=0) {
                if (confirm('Perdiste! Jugar de nuevo?')) {
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego=false;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo ac?? queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});