/**
 * Created by ZZS on 7/13/16.
 */
app.controller('TableController', ['tableService', function (tableService) {
    var self = this;
    self.tables = [];
    self.shapeBind = 'tableShape';//used to show class tableShape2 tableShape4 tableShape8
    
    self.loadTables = function () {
        tableService.list().then(function (data) {
            self.tables = data.data;
        });
    };
    self.loadTables();
    
    self.cancelTable = function (table_real_id, tid) {
        console.log(table_real_id, tid)
        // self.chose[tid] = {};
        self.update(table_real_id, false); //available
    };
    
    self.update = function (table_real_id, guest) {
        var table = {
            _id:table_real_id
        };
        if (guest) {
            table.time = guest.time;
            table.code = guest._id;
        }else {
            table.time = '-';
            table.code = '-';
        }



        table.status = !guest; //if have guest then: false-->occupied

        console.log(table);
        tableService.update(table).then(function (data) {
            self.loadTables();
        })
    }
}]);