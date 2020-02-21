import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = true;
  _hasBackgroundImage = false;
  menus = [
    {
      title: 'Funcionalidades',
      type: 'header'
    },
    {
      title: 'Página Inicial',
      icon: 'fas fa-home',
      path: 'app/home',
      active: false,
    },
    {
      title: 'Agenda',
      icon: 'far fa-calendar-alt',
      active: false,
      type: 'simple'
    },
    {
      title: 'Cadastros',
      icon: 'fas fa-plus',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Empresa',
          path: 'app/cadastro-empresa'
        },
        {
          title: 'Espécies',
          path: 'app/cadastro-especie'
        },
        {
          title: 'Raças',
          path: 'app/cadastro-raca'
        },
        {
          title: 'Fornecedores'
        },
        {
          title: 'Funcionários'
        },
        {
          title: 'Laboratórios'
        },
        {
          title: 'Pelagens'
        },
        {
          title: 'Perfis de Acesso'
        },
        {
          title: 'Serviços'
        },
        {
          title: 'Serviços de estética'
        },
        {
          title: 'Tipos de cirurgia'
        },
        {
          title: 'Tipos de exame'
        },
        {
          title: 'Tipos de telefone'
        },
        {
          title: 'Vacinas'
        }
      ]
    },
    {
      title: 'Clientes',
      icon: 'fas fa-users',
      active: false,
      type: 'simple',
      badge: {
        text: '3',
        class: 'badge-danger'
      }
    },
    {
      title: 'Contas a Pagar',
      icon: 'fas fa-hand-holding-usd',
      active: false,
      type: 'simple',
    },
    {
      title: 'Estoque',
      icon: 'fas fa-boxes',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Produtos'
        },
        {
          title: 'Grupos de produto'
        },
        {
          title: 'Entradas'
        },
        {
          title: 'Atual'
        },
        {
          title: 'Contagem / Balanço'
        }
      ]
    },
    {
      title: 'Financeiro',
      icon: 'fas fa-dollar-sign',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Lançamentos'
        },
        {
          title: 'Caixas'
        },
        {
          title: 'Formas de Pagamento'
        },
        {
          title: 'Condições de Pagamento'
        },
        {
          title: 'Comissões'
        },
        {
          title: 'Faturamento',
          active: false,
          type: 'dropdown',
          sublevels: [
            {
              title: 'Diário',
            },
            {
              title: 'Por serviço'
            },
            {
              title: 'Por forma de pagamento'
            }
          ]
        }
      ]
    },
    {
      title: 'Internação',
      icon: 'fas fa-hospital-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Internados',
        },
        {
          title: 'Boxes'
        }
      ]
    },
    {
      title: 'Relatórios',
      icon: 'far fa-file-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Animais aniversariantes'
        },
        {
          title: 'Banhos agendados'
        },
        {
          title: 'Como conheceram'
        },
        {
          title: 'E-mails enviados'
        },
        {
          title: 'Financeiro',
          type: 'dropdown',
          sublevels: [
            {
              title: 'Clientes com crédito'
            },
            {
              title: 'Clientes com débito'
            },
            {
              title: 'Despesas'
            }
          ]
        },
        {
          title: 'Produtos vendidos'
        },
        {
          title: 'Serviços realizados'
        },
        {
          title: 'SMS enviados'
        },
        {
          title: 'Vacinações pendentes'
        },
        {
          title: 'Vencimento de pacotes'
        }

      ]
    },
    {
      title: 'Venda Rápida',
      icon: 'fas fa-shopping-cart',
      active: false,
      type: 'simple'
    },
    {
      title: 'Configurações',
      icon: 'fas fa-cog',
      active: false,
      type: 'simple',
      path: ''
    },
    {
      title: 'Sair',
      icon: 'fas fa-power-off',
      path: 'login'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
