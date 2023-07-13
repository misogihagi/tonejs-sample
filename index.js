const synth = new Tone.Synth().toDestination();

window.onload = () => {
  drawKeyboard();
};

// 鍵盤の描画メソッド
const drawKeyboard = () => {
  // 鍵盤の生成(音階を表す文字列を配列に入れておきます)
  const musicalScaleArray = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  let baseKey;
  // 1つ1つ鍵盤を作っていく作業
  for (let i = 0; i < 25; i++) {
    // 鍵盤をボタンとして作成する
    const key = document.createElement("button");
    // idに音階の情報を付与(スタートはC3になるようにしています)
    key.id = `key_${musicalScaleArray[i % musicalScaleArray.length]}${Math.floor(i / 12) + 3}`;

    // クリックしている間に音が出るという仕様にする
    key.onmousedown = play;
    key.onmouseup = stop;
    key.onmouseleave = stop;

    // 黒鍵が白鍵かによってデザインを変えるので、そのためのclassをそれぞれ付与
    if (musicalScaleArray[i % 12].indexOf("#") > -1) {
      // 黒鍵(#がついている)
      key.classList.add("black");
    } else {
      // 白鍵
      key.classList.add("white");
      baseKey = document.createElement("div");
    }
    baseKey.appendChild(key);
    document.getElementById("keyboard").appendChild(baseKey);
  }
};

// 音の再生
const play = async (e) => {
  await Tone.start();
  // 鍵盤のidから音階を取得
  const scale = e.target.id.split("_")[1];
  // 指定した音を再生する
  synth.triggerAttack(scale);
};

// 音の停止
const stop = async (e) => {
  synth.triggerRelease();
};
