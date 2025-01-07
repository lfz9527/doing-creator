import {useState, FC, useMemo, useEffect} from 'react'
import classNames from 'classnames'
import TabChildren from '../tab-children'
import {SettingProps} from '@core/meta'
import {useComponent} from '@/store'

export type TabContentProps = {
    tabs: SettingProps
    onChange?: (key: string) => void
}

const TabContent: FC<TabContentProps> = ({tabs = [], onChange}) => {
    const {curComponentInfo} = useComponent()
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?.key)
    const [childContent, setChildContent] = useState<any>([])
    const getTabClass = (tab: string) =>
        classNames(
            'flex-1',
            'flex',
            'items-center',
            'justify-center',
            'text-center',
            'h-9',
            'cursor-pointer',
            'text-[#666]',
            'relative',
            'first:before:hidden', // 第一个元素隐藏分割线
            'before:absolute',
            'before:left-0',
            'before:top-2',
            'before:bottom-2',
            'before:w-[1px]',
            'before:bg-[#e5e5e5]',
            {
                'text-[#002c8c]': activeTab === tab,
                'after:block': activeTab === tab,
                'after:absolute': activeTab === tab,
                'after:w-full': activeTab === tab,
                'after:h-[2px]': activeTab === tab,
                'after:bg-[#4096ff]': activeTab === tab,
                'after:left-1/2': activeTab === tab,
                'after:bottom-[-1px]': activeTab === tab,
                'after:translate-x-[-50%]': activeTab === tab
            }
        )

    const tabChange = (active: string) => {
        setActiveTab(active)
        onChange?.(active)
    }
    useEffect(() => {
        if(tabs) {
            setActiveTab(tabs[0]?.key)
        }
        console.log('tabs',tabs);
        
    }, [tabs])

    useEffect(() => {
        const curTab = tabs.find((tab) => tab.key === activeTab)
        setChildContent(()=> curTab?.children || [])
    }, [activeTab,curComponentInfo.id])


    const curTabs = useMemo(() => tabs, [tabs, curComponentInfo.id])

    return (
        <>
            <div className='flex border-b-[1px] border-solid border-[#dcdee3] '>
                {curTabs.map((tab) => {
                    return (
                        <div
                            key={tab.key}
                            className={getTabClass(tab.key)}
                            onClick={() => tabChange(tab.key)}
                        >
                            {tab.tabLabel}
                        </div>
                    )
                })}
            </div>
            <TabChildren childContent={childContent} />
        </>
    )
}
export default TabContent
