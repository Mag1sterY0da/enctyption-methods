function prepare_date_and_decrypt_tritemius() {
	let text = document.getElementById('text_for_decrypt').value;
	let full_output;
	let path = 'output_decrypt';
	let msg_arr = text.split('');
	let abc_custom = document.getElementById('abc_decrypt').value;
	document.getElementById('output_decrypt').value = '';
	//let k = parseInt(document.getElementById('k_shift_crypt').value);

	let lang = document.getElementById('eng_decrypt');
	if (lang.checked) {
		lang = 'english';
		if (abc_custom !== '') {
			abc_en = abc_custom;
		}
	} else {
		lang = 'ukrainian';
		if (abc_custom !== '') {
			abc_ua = abc_custom;
		}
	}
	let method = document.getElementById('linear_equation_decrypt');
	if (method.checked) {
		method = 'linear_equation';
	} else {
		method = document.getElementById('nonlinear_equation_decrypt');
		if (method.checked) {
			method = 'nonlinear_equation';
		} else {
			method = 'p_word_encrypt';
		}
	}
	msg_arr = decrypt(msg_arr, lang, method);
	full_output = preparePrintText(msg_arr, '');
	printText(full_output, path);
}

function prepare_date_and_encrypt_tritemius() {
	let text = document.getElementById('text_for_encrypt').value;
	let full_output;
	let path = 'output_encrypt';
	let msg_arr = text.split('');
	let abc_custom = document.getElementById('abc_encrypt').value;
	document.getElementById('output_encrypt').value = '';
	//let k = parseInt(document.getElementById('k_shift_crypt').value);

	let lang = document.getElementById('eng_encrypt');
	if (lang.checked) {
		lang = 'english';
		if (abc_custom !== '') {
			abc_en = abc_custom;
		}
	} else {
		lang = 'ukrainian';
		if (abc_custom !== '') {
			abc_ua = abc_custom;
		}
	}
	let method = document.getElementById('linear_equation_encrypt');
	if (method.checked) {
		method = 'linear_equation';
	} else {
		method = document.getElementById('nonlinear_equation_encrypt');
		if (method.checked) {
			method = 'nonlinear_equation';
		} else {
			method = 'p_word_encrypt';
		}
	}
	msg_arr = encrypt(msg_arr, lang, method);
	full_output = preparePrintText(msg_arr, '');
	printText(full_output, path);
}

function decrypt(msg_arr = [], lang, method) {
	let a = parseInt(document.getElementById('a_num_decrypt').value);
	let b = parseInt(document.getElementById('b_num_decrypt').value);
	let c = parseInt(document.getElementById('c_num_decrypt').value);
	let p = document.getElementById('word_decrypt').value;
	let p_word = p.split('');
	let j = 0;
	let n, x, y, k;
	if (lang === 'english') {
		n = abc_en.length;
		if (method === 'linear_equation') {
			msg_arr.forEach((item, i) => {
					y = translateTextEn(msg_arr[i]);
					k = a * i + b;
					x = (y + n - (k % n)) % n;
					msg_arr[i] = translateTextEnBack(x);
				}
			);
		} else if (method === 'nonlinear_equation') {
			msg_arr.forEach((item, i) => {
					y = translateTextEn(msg_arr[i]);
					k = a ** 2 + b * i + c;
					x = (y + n - (k % n)) % n;
					msg_arr[i] = translateTextEnBack(x);
				}
			);
		} else {
			msg_arr.forEach((item, i) => {
					if (j % p_word.length === 0) {
						j = 0;
					}
					x = translateTextEn(msg_arr[i]) - translateTextEn(p_word[i]);
					while (x < 0) {
						x += n;
					}
					msg_arr[i] = translateTextEnBack(x);
					j++;
				}
			);
		}
	} else {
		n = abc_ua.length;
		if (method === 'linear_equation') {
			msg_arr.forEach((item, i) => {
					y = translateTextUa(msg_arr[i]);
					k = a * i + b;
					x = (y + n - (k % n)) % n;
					msg_arr[i] = translateTextUaBack(x);
				}
			);
		} else if (method === 'nonlinear_equation') {
			msg_arr.forEach((item, i) => {
					y = translateTextUa(msg_arr[i]);
					k = a ** 2 + b * i + c;
					x = (y + n - (k % n)) % n;
					msg_arr[i] = translateTextUaBack(x);
				}
			);
		} else {
			msg_arr.forEach((item, i) => {
					if (j % p_word.length === 0) {
						j = 0;
					}
					x = translateTextUa(msg_arr[i]) - translateTextUa(p_word[i]);
					while (x < 0) {
						x += n;
					}
					msg_arr[i] = translateTextUaBack(x);
					j++;
				}
			);
		}
	}
	//console.log(msg_arr);

	return msg_arr;
}

function encrypt(msg_arr = [], lang, method) {
	let a = parseInt(document.getElementById('a_num_encrypt').value);
	let b = parseInt(document.getElementById('b_num_encrypt').value);
	let c = parseInt(document.getElementById('c_num_encrypt').value);
	let p = document.getElementById('word_encrypt').value;
	let p_word = p.split('');
	let j = 0;
	let n, x, y, k;
	if (lang === 'english') {
		n = abc_en.length;
		if (method === 'linear_equation') {
			msg_arr.forEach((item, i) => {
					x = translateTextEn(msg_arr[i]);
					k = a * i + b;
					y = (x + k) % n;
					msg_arr[i] = translateTextEnBack(y);
				}
			);
		} else if (method === 'nonlinear_equation') {
			msg_arr.forEach((item, i) => {
					x = translateTextEn(msg_arr[i]);
					k = a ** 2 + b * i + c;
					y = (x + k) % n;
					msg_arr[i] = translateTextEnBack(y);
				}
			);
		} else {
			msg_arr.forEach((item, i) => {
					if (j % p_word.length === 0) {
						j = 0;
					}
					y = (translateTextEn(p_word[j]) + translateTextEn(msg_arr[i])) % n;
					msg_arr[i] = translateTextEnBack(y);
					j++;
				}
			);
		}
	} else {
		n = abc_ua.length;
		if (method === 'linear_equation') {
			msg_arr.forEach((item, i) => {
					x = translateTextUa(msg_arr[i]);
					k = a * i + b;
					y = (x + k) % n;
					msg_arr[i] = translateTextUaBack(y);
				}
			);
		} else if (method === 'nonlinear_equation') {
			msg_arr.forEach((item, i) => {
					x = translateTextUa(msg_arr[i]);
					k = a ** 2 + b * i + c;
					y = (x + k) % n;
					msg_arr[i] = translateTextUaBack(y);
				}
			);
		} else {
			msg_arr.forEach((item, i) => {
					if (j % p_word.length === 0) {
						j = 0;
					}
					y = (translateTextUa(p_word[j]) + translateTextUa(msg_arr[i])) % n;
					msg_arr[i] = translateTextUaBack(y);
					j++;
				}
			);
		}
	}
	//console.log(msg_arr);

	return msg_arr;
}

function preparePrintText(msg_arr = [], mode = '') {
	//document.getElementById('text-area').innerHTML = '';
	//document.getElementById("output").innerHTML = mode;
	//mode = "New String";
	//document.getElementById("newOutput").value = "";
	let fulltext = mode + '';
	msg_arr.forEach((item) => fulltext += item);
	return fulltext;
	//document.getElementById('newOutput').value = fulltext;
	//document.getElementById('output').insertAdjacentHTML('beforeend', '<p>Word:</p>');
	//document.getElementById("out").innerHTML = mode;
	/*msg_arr.forEach((item) =>
		document
			.getElementById('output')
			.insertAdjacentHTML('beforeend', `${item}`)
	);*/
	/*document
		.getElementById('output')
		.insertAdjacentHTML('beforeend', `<br><br>`);*/
}

function printText(fullText = '', path) {
	document.getElementById(path).value = fullText;
}

function translateTextEn(character) {
	let i = 0;
	while (character !== abc_en[i]) {
		i++;
	}
	//console.log(abc.length);
	return i;
}

function translateTextEnBack(i) {
	return abc_en[i];
}

function translateTextUa(character) {
	let i = 0;
	while (character !== abc_ua[i]) {
		i++;
	}
	//console.log(abc.length);
	return i;
}

function translateTextUaBack(i) {
	return abc_ua[i];
}

function bruteForce(msg_arr, lang, k, path) {
	//let text = document.getElementById('encrypted_text').value;
	let full_text = '';
	let num_k = '';
	console.log(k);
	console.log(msg_arr);
	let i = 1;
	while (i <= k) {
		msg_arr = decrypt(msg_arr, lang, 1);
		num_k = 'k = ' + i;
		full_text += num_k + '\t';
		msg_arr.forEach((item) => full_text += item);
		full_text += '\n';
		i++;
	}
	printText(full_text, path);
}

/*function saveStaticDataToFile() {
	let text = document.getElementById('encrypted_text').value;
	let blob = new Blob([text],
		{type: 'text/plain;charset=utf-8'});
	saveAs(blob, 'static.txt');
}

document.getElementById('input_file')
	.addEventListener('change', function () {
		let fr = new FileReader();
		fr.onload = function () {
			document.getElementById('output').textContent = fr.result.toString();
		}
		fr.readAsText(this.files[0]);
	})*/
let abc_en = [' ', '!', '"', '#', '$', '%', '&', '`', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4',
	'5', '6', '7', '8', '9', '0', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '\'',
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
	'x', 'y', 'z', '{', '|', '}', '~'];
let abc_ua = [' ', '!', '"', '#', '$', '%', '&', '`', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4',
	'5', '6', '7', '8', '9', '0', ':', ';', '<', '=', '>', '?', '@', 'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж',
	'З', 'И', 'І', 'Й', 'Ї', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь',
	'Ю', 'Я', '[', '\\', ']', '^', '_', '\'', 'а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'й', 'к',
	'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я', '{', '|', '}', '~'];
