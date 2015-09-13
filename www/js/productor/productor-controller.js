appModule
    .controller('ProductoresCtrl', function($scope, Productores) {
        $scope.productores = Productores.obtenerProductores();
    })

    .controller('ProductorCtrl', function($scope, $http, $stateParams, Productores, Consultas,$resource, $localstorage,$ionicPopup,$state) {
        $scope.productor = Productores.obtenerProductorPorId($stateParams.productorId);

        $scope.descripcion = true;
        $scope.comentarios = false;
        $scope.consultas = false;
        $scope.mostrarDescripcion = function () {
            $scope.descripcion = true;
            $scope.comentarios = false;
            $scope.consultas = false;
        };
        $scope.mostrarComentarios = function () {
            $scope.descripcion = false;
            $scope.comentarios = true;
            $scope.consultas = false;
        };
        $scope.mostrarConsultas = function () {
            $scope.descripcion = false;
            $scope.comentarios = false;
            $scope.consultas = true;
        };

        $scope.nuevaConsulta = false;
        $scope.consulta = { Descripcion: '' };
        $scope.crearConsulta = function () {
            $scope.nuevaConsulta = true;
        };
        $scope.guardarConsulta = function (productorId, descripcion) {
            //Consultas.guardarConsulta(descripcion).$promise.then(
            //    function () {
            //        $scope.nuevaConsulta = false;
            //        //actualizar consultas
            //        $scope.consulta = { Descripcion: '' };
            //    },
            //    function (response) { $scope.errors = response.data; });
            var authData = $localstorage.getObject('authorizationData');
            var user = authData.userName;
            var data = "Bearer "+authData.token;
            $http({ method: 'POST', isArray: false, url: apiUrl+'/api/ConsultasProductor/PostConsultas', params: { productorId: productorId, descripcion: descripcion },headers: { 'Authorization': data } }).then(
                function () {
                    $scope.nuevaConsulta = false;
                    $scope.consulta = { Descripcion: '' };
                    //Actualizo
                    $scope.productor = Productores.obtenerProductorPorId($stateParams.productorId);

                });
        };
        $scope.cancelarConsulta = function (){
            $scope.nuevaConsulta = false;
            $scope.consulta = { Descripcion: '' };
        };

        $scope.agregarAlCarrito = function(producto){
            debugger;
            var pedidos = $localstorage.getObject('Pedido');
            if (pedidos == null || !(pedidos.length > 0))
            {
                pedidos = [
                    {
                        productoId: producto.Id,
                        cantidadPedido: producto.Cantidad,
                        imagenProducto: producto.ImagenProducto,
                        nombre: producto.Nombre,
                        nombreProductor: producto.NombreProductor,
                        precio: producto.Precio,
                        unidad: producto.Unidad,
                        cantidad: producto.Cantidad
                    }
                ];
            }
            else{
                var encontrado = false;
                for(var i = 0; i < pedidos.length; i++){
                    if(pedidos[i].productoId == producto.Id){
                        encontrado = true;
                        pedidos[i].cantidadPedido = pedidos[i].cantidadPedido + producto.Cantidad;
                    }
                }
                if(!encontrado){
                    pedidos.push({
                        productoId: producto.Id,
                        cantidadPedido: producto.Cantidad,
                        imagenProducto: producto.ImagenProducto,
                        nombre: producto.Nombre,
                        nombreProductor: producto.NombreProductor,
                        precio: producto.Precio,
                        unidad: producto.Unidad,
                        cantidad: producto.Cantidad
                    });
                }
            }

            $localstorage.setObject('Pedido', pedidos);

            $("#totalPedidos").html(pedidos.length);

            //MUESTRO POPUP

            var confirmPopup = $ionicPopup.confirm({
                template: 'Se ha agregado ' + producto.Cantidad + ' ' + producto.Unidad + ' de ' + producto.Nombre + ' al canasto',
                cancelText: 'Seguir comprando',
                cancelType: 'button-balanced',
                okText: 'Ir al canasto',
                okType: 'button-balanced'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $state.go('app.pedido');
                } else {

                }
            });


            //FIN POPUP
        }
    })


