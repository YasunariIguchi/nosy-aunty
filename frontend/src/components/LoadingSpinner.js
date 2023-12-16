export default function LoadingSpinner({ visibility }) {
  if(!visibility) return null;
  return (
    <>
      <style jsx="true">{`
        .spinner-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .windows8 {
          position: relative;
          width: 46px;
          height:46px;
          margin:auto;
        }

        .windows8 .wBall {
          position: absolute;
          width: 44px;
          height: 44px;
          opacity: 0;
          transform: rotate(225deg);
            -o-transform: rotate(225deg);
            -ms-transform: rotate(225deg);
            -webkit-transform: rotate(225deg);
            -moz-transform: rotate(225deg);
          animation: orbit 6.96s infinite;
            -o-animation: orbit 6.96s infinite;
            -ms-animation: orbit 6.96s infinite;
            -webkit-animation: orbit 6.96s infinite;
            -moz-animation: orbit 6.96s infinite;
        }

        .windows8 .wBall .wInnerBall{
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgb(0,0,0);
          left:0px;
          top:0px;
          border-radius: 6px;
        }

        .windows8 #wBall_1 {
          animation-delay: 1.52s;
            -o-animation-delay: 1.52s;
            -ms-animation-delay: 1.52s;
            -webkit-animation-delay: 1.52s;
            -moz-animation-delay: 1.52s;
        }

        .windows8 #wBall_2 {
          animation-delay: 0.3s;
            -o-animation-delay: 0.3s;
            -ms-animation-delay: 0.3s;
            -webkit-animation-delay: 0.3s;
            -moz-animation-delay: 0.3s;
        }

        .windows8 #wBall_3 {
          animation-delay: 0.61s;
            -o-animation-delay: 0.61s;
            -ms-animation-delay: 0.61s;
            -webkit-animation-delay: 0.61s;
            -moz-animation-delay: 0.61s;
        }

        .windows8 #wBall_4 {
          animation-delay: 0.91s;
            -o-animation-delay: 0.91s;
            -ms-animation-delay: 0.91s;
            -webkit-animation-delay: 0.91s;
            -moz-animation-delay: 0.91s;
        }

        .windows8 #wBall_5 {
          animation-delay: 1.22s;
            -o-animation-delay: 1.22s;
            -ms-animation-delay: 1.22s;
            -webkit-animation-delay: 1.22s;
            -moz-animation-delay: 1.22s;
        }



        @keyframes orbit {
          0% {
            opacity: 1;
            z-index:99;
            transform: rotate(180deg);
            animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            transform: rotate(300deg);
            animation-timing-function: linear;
            origin:0%;
          }

          30% {
            opacity: 1;
            transform:rotate(410deg);
            animation-timing-function: ease-in-out;
            origin:7%;
          }

          39% {
            opacity: 1;
            transform: rotate(645deg);
            animation-timing-function: linear;
            origin:30%;
          }

          70% {
            opacity: 1;
            transform: rotate(770deg);
            animation-timing-function: ease-out;
            origin:39%;
          }

          75% {
            opacity: 1;
            transform: rotate(900deg);
            animation-timing-function: ease-out;
            origin:70%;
          }

          76% {
          opacity: 0;
            transform:rotate(900deg);
          }

          100% {
          opacity: 0;
            transform: rotate(900deg);
          }
        }

        @-o-keyframes orbit {
          0% {
            opacity: 1;
            z-index:99;
            -o-transform: rotate(180deg);
            -o-animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            -o-transform: rotate(300deg);
            -o-animation-timing-function: linear;
            -o-origin:0%;
          }

          30% {
            opacity: 1;
            -o-transform:rotate(410deg);
            -o-animation-timing-function: ease-in-out;
            -o-origin:7%;
          }

          39% {
            opacity: 1;
            -o-transform: rotate(645deg);
            -o-animation-timing-function: linear;
            -o-origin:30%;
          }

          70% {
            opacity: 1;
            -o-transform: rotate(770deg);
            -o-animation-timing-function: ease-out;
            -o-origin:39%;
          }

          75% {
            opacity: 1;
            -o-transform: rotate(900deg);
            -o-animation-timing-function: ease-out;
            -o-origin:70%;
          }

          76% {
          opacity: 0;
            -o-transform:rotate(900deg);
          }

          100% {
          opacity: 0;
            -o-transform: rotate(900deg);
          }
        }

        @-ms-keyframes orbit {
          0% {
            opacity: 1;
            z-index:99;
            -ms-transform: rotate(180deg);
            -ms-animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            -ms-transform: rotate(300deg);
            -ms-animation-timing-function: linear;
            -ms-origin:0%;
          }

          30% {
            opacity: 1;
            -ms-transform:rotate(410deg);
            -ms-animation-timing-function: ease-in-out;
            -ms-origin:7%;
          }

          39% {
            opacity: 1;
            -ms-transform: rotate(645deg);
            -ms-animation-timing-function: linear;
            -ms-origin:30%;
          }

          70% {
            opacity: 1;
            -ms-transform: rotate(770deg);
            -ms-animation-timing-function: ease-out;
            -ms-origin:39%;
          }

          75% {
            opacity: 1;
            -ms-transform: rotate(900deg);
            -ms-animation-timing-function: ease-out;
            -ms-origin:70%;
          }

          76% {
          opacity: 0;
            -ms-transform:rotate(900deg);
          }

          100% {
          opacity: 0;
            -ms-transform: rotate(900deg);
          }
        }

        @-webkit-keyframes orbit {
          0% {
            opacity: 1;
            z-index:99;
            -webkit-transform: rotate(180deg);
            -webkit-animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            -webkit-transform: rotate(300deg);
            -webkit-animation-timing-function: linear;
            -webkit-origin:0%;
          }

          30% {
            opacity: 1;
            -webkit-transform:rotate(410deg);
            -webkit-animation-timing-function: ease-in-out;
            -webkit-origin:7%;
          }

          39% {
            opacity: 1;
            -webkit-transform: rotate(645deg);
            -webkit-animation-timing-function: linear;
            -webkit-origin:30%;
          }

          70% {
            opacity: 1;
            -webkit-transform: rotate(770deg);
            -webkit-animation-timing-function: ease-out;
            -webkit-origin:39%;
          }

          75% {
            opacity: 1;
            -webkit-transform: rotate(900deg);
            -webkit-animation-timing-function: ease-out;
            -webkit-origin:70%;
          }

          76% {
          opacity: 0;
            -webkit-transform:rotate(900deg);
          }

          100% {
          opacity: 0;
            -webkit-transform: rotate(900deg);
          }
        }

        @-moz-keyframes orbit {
          0% {
            opacity: 1;
            z-index:99;
            -moz-transform: rotate(180deg);
            -moz-animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            -moz-transform: rotate(300deg);
            -moz-animation-timing-function: linear;
            -moz-origin:0%;
          }

          30% {
            opacity: 1;
            -moz-transform:rotate(410deg);
            -moz-animation-timing-function: ease-in-out;
            -moz-origin:7%;
          }

          39% {
            opacity: 1;
            -moz-transform: rotate(645deg);
            -moz-animation-timing-function: linear;
            -moz-origin:30%;
          }

          70% {
            opacity: 1;
            -moz-transform: rotate(770deg);
            -moz-animation-timing-function: ease-out;
            -moz-origin:39%;
          }

          75% {
            opacity: 1;
            -moz-transform: rotate(900deg);
            -moz-animation-timing-function: ease-out;
            -moz-origin:70%;
          }

          76% {
          opacity: 0;
            -moz-transform:rotate(900deg);
          }

          100% {
          opacity: 0;
            -moz-transform: rotate(900deg);
          }
        }
      `}</style>
      <div className="spinner-wrap">
        <div className="windows8">
          <div className="wBall" id="wBall_1">
            <div className="wInnerBall"></div>
          </div>
          <div className="wBall" id="wBall_2">
            <div className="wInnerBall"></div>
          </div>
          <div className="wBall" id="wBall_3">
            <div className="wInnerBall"></div>
          </div>
          <div className="wBall" id="wBall_4">
            <div className="wInnerBall"></div>
          </div>
          <div className="wBall" id="wBall_5">
            <div className="wInnerBall"></div>
          </div>
        </div>
      </div>
    </>
  );
}