appModule
    .controller('CategoriasCtrl', function($scope, Categorias) {
        $scope.categorias = Categorias.obtenerCategorias();
    })

    .controller('CategoriaCtrl', function($scope, Categorias, $resource, $stateParams, $localstorage, $ionicPopup,$state) {
        $scope.categoria = Categorias.obtenerCategoriaPorId($stateParams.categoriaId);

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
                    //title: 'Consume Ice Cream',
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