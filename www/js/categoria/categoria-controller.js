appModule
    .controller('CategoriasCtrl', function($scope, Categorias) {
        $scope.categorias = Categorias.obtenerCategorias();
    })

    .controller('CategoriaCtrl', function($scope, Categorias, $resource, $stateParams, $localstorage) {
        $scope.categoria = Categorias.obtenerCategoriaPorId($stateParams.categoriaId);

        $scope.agregarAlCarrito = function(productoId){
            $resource('http://localhost:51297/api/Productos/'+productoId).get(function(response){
                var producto = response;

                var pedidos = $localstorage.getObject('Pedido');
                if (pedidos == null || !(pedidos.length > 0))
                {
                    pedidos = [
                        {
                            productoId: productoId,
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
                        if(pedidos[i].productoId == productoId){
                            encontrado = true;
                            pedidos[i].cantidadPedido = pedidos[i].cantidadPedido + producto.Cantidad;
                        }
                    }
                    if(!encontrado){
                        pedidos.push({
                            productoId: productoId,
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
            });
        }
    })