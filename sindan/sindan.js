window.onload = function(){
    const answerButton = document.getElementById('button'),
          resultArea = document.getElementById('result-area'),
          name = document.getElementById('name');

          function deleteElement(element){
            while (element.firstChild) {
              element.removeChild(element.firstChild)
            }
          }

        answerButton.onclick = () => {
          var userName = name.value;
          if (userName.length === 0) {
            return;
          }

          deleteElement(resultArea);
          var header = document.createElement('h3');
          header.innerHTML = '診断結果';
          resultArea.appendChild(header);

          var paragraph = document.createElement('p');
          const result = nameFunction(userName);
          paragraph.innerHTML = result;
          resultArea.appendChild(paragraph);
          console.log(userName);
        }
    const answer = [
      '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
      '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
      '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
      '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
      '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
      '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
      '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
      '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
      '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
      '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
      '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
      '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
      '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
      '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
      '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
      '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を押さえられる{userName}が皆から評価されています。'
    ];

    function nameFunction(userName){
      var sumOfcherCode = 0;
      for (var i = 0; i < userName.length; i++) {
        sumOfcherCode = sumOfcherCode + userName.charCodeAt(i);
      }
      var index = sumOfcherCode % answer.length;
      var result = answer[index];
      result = result.replace(/\{userName}/g, userName);

      return result;
    }
    console.assert(
    nameFunction('二郎') === '二郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
}
