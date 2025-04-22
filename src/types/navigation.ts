export enum NavigationItems {
  DASHBOARD = 'Dashboard',
  REPORT = 'Relatório',
  EVENTS = 'Eventos',
  CLIENTS = 'Clientes',
  SETTINGS = 'Configurações'
}

export interface NavigationItem {
  name: NavigationItems;
  href: string;
  icon: string;
}

export const navigationConfig: NavigationItem[] = [
  {
    name: NavigationItems.DASHBOARD,
    href: '/dashboard',
    icon: 'Home'
  },
  {
    name: NavigationItems.REPORT,
    href: '/dashboard/analysis',
    icon: 'DollarSign'
  },
  {
    name: NavigationItems.EVENTS,
    href: '/dashboard/events',
    icon: 'Calendar'
  },
  {
    name: NavigationItems.CLIENTS,
    href: '/dashboard/clients',
    icon: 'DollarSign'
  },
  {
    name: NavigationItems.SETTINGS,
    href: '/settings',
    icon: 'Settings'
  }
];