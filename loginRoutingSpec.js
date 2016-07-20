/**
 * Created by ZZS on 7/20/16.
 */
//use concept of PageObject, first write functions, then use it in describe
function ReservationListPage() {

    this.getReservationListRows = function () {
        return element.all(by.repeater('reservation in resvCtrl.list'))
    };
    this.getIdForRow = function (row) {
        return element(by.repeater('reservation in resvCtrl.list').row(row).column('reservation._id'))
    }

}

function LoginPage() {
    this.open = function () {
        browser.get('#/home/login');
    };
    
    this.fillInLogin = function (uname, pword) {
        //get element by model
        var username = element(by.model('loginCtrl.user.username'));
        var password = element(by.model('loginCtrl.user.password'));
        
        //fake type
        username.sendKeys(uname);
        password.sendKeys(pword);
    };
    
    this.clickBtn = function () {
        //click login button
        element(by.css('.btn.btn-primary')).click();
    };
    
    this.isLogoutLinkVisible = function () {
        return element(by.css('.logout-link')).isDisplayed();
    }
}

//jasmine's syntax
describe('Login routing to reservationList test', function () {
    it('should log in and show reservations', function () {
        var loginPage = new LoginPage();
        loginPage.open();

        expect(loginPage.isLogoutLinkVisible()).toBe(false);

        loginPage.fillInLogin('admin', 'admin');
        loginPage.clickBtn();
        //redirect expect
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/admin/reservationList');

        var reservationPage = new ReservationListPage();
        expect(reservationPage.getReservationListRows().count()).toEqual(7);
        expect(reservationPage.getIdForRow(0).getText()).toEqual('577acab10b4fc1301ce84b65');
        
        //check logout link is shown
        expect(loginPage.isLogoutLinkVisible()).toBe(true);
    })
});