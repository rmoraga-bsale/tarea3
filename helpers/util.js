/**
 * @IUtil 
 * Clase que contiene funciones  de utilidad  en interfaces
 *
 * 
 * @author StarkTeam
 * @date Septoembre 2019
 *
 */
 module.exports = class Util {


	static loading(element) {

		element.innerHTML = `<div>
							   <p class='loading'>Cargando.....<p>
							</diV>`
	}

	static unixToDate(unixDate) {

		const formateDate = new Date(unixDate*1000);
		//return formateDate.toLocaleString('es-CL', { timeZone: 'UTC' });
		return formateDate.toLocaleString('es-CL');
	}

	static formateMysqlDate(date) {
		const formateDate = new Date(date);
		return formateDate.toLocaleDateString('es-CL');

	}

	static formatDateToUnix(date){
		const formateDate = new Date(date);
		return formateDate.getTime();
	}

	static dateDifference (date1, Date2){

		const formateDate1 = new Date(date1).getTime();
		const formateDate2 = new Date(date2).getTime();
		return formateDate2-formateDate1

	}

   // Método que retorna el parámetro que contienen la URL siempre que esté esté al final de la misma
   // Eso es para el caso de URL utilizadas en Sinatra
   // Se puede obtener el Pathname  en javascript con window.location.pathname
	static getParamsOnUrl(pathname) {
	 
		const pth = pathname;
		let urlArray = pth.split("/");
		let param = urlArray[urlArray.length -1];
		return param

	}

	//  Nétodo que se eliminará
	// Utiliza

	/*static getConfigMarketDomain(){
		return 'https://config.bsalemarket.com/marketconfig';
	}

  // Método que retorna la URL de validación de un documento
	static getDocViewerUrlCL() {
		return 'https://app2.bsale.cl/view/4';
	}*/
}
