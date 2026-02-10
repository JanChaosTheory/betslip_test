"use client";

import { Fragment } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { SelectionCell } from "./SelectionCell";
import { MarketGrid } from "./MarketGrid";
import { MarketRowGridHeader, MarketRowGridRow } from "./MarketRowGrid";
import { cn } from "@/lib/utils";
import type { Market } from "../data/match";

export type RowSelection = Record<string, string | null>;

type MarketPanelProps = {
  market: Market;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: Set<string>;
  onRowSelect: (rowId: string, optionId: string) => void;
  children?: React.ReactNode;
};

/** True if this market has a left-hand label column (e.g. "21.5", "2-0"). */
function hasLeftLabel(market: Market): boolean {
  return market.rows.some((r) => (r.rowLabel ?? "").trim() !== "");
}

/** Numeric row labels (e.g. totals 21.5, 6.5) use right-aligned variant for consistent alignment. */
function isNumericLabel(value: string | undefined): boolean {
  if (value == null || value === "") return false;
  return /^\d+(\.\d+)?$/.test(value);
}

export function MarketPanel({
  market,
  open,
  onOpenChange,
  selectedIds,
  onRowSelect,
  children,
}: MarketPanelProps) {
  const marketId = market.id;
  const isTable = market.columnHeaders && market.columnHeaders.length > 0;
  const isDoubleResult = market.layout === "doubleResult";
  const isThreeCol =
    isTable &&
    market.columnHeaders!.length === 3 &&
    market.rows[0]?.options.length === 3;
  const leftLabel = hasLeftLabel(market);
  const isSelected = (optionId: string) => selectedIds.has(`${marketId}:${optionId}`);

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <div className="theme-transition surface-panel border-b border-border">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="market-title-trigger theme-transition flex w-full items-center justify-between rounded-none px-4 py-3"
          >
            <span className="truncate font-semibold">{market.title}</span>
            <span className="flex items-center gap-2">
              <ChevronDown
                className={cn("size-6 shrink-0 text-foreground/80 transition-transform", open && "rotate-180")}
              />
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent forceMount>
          <div className="market-inner">
            {isDoubleResult ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {market.rows.map((row) => {
                  const opt = row.options[0]!;
                  return (
                    <SelectionCell
                      key={row.id}
                      option={opt}
                      selected={isSelected(opt.id)}
                      onToggle={() => onRowSelect(row.id, opt.id)}
                    />
                  );
                })}
              </div>
            ) : isTable ? (
              <MarketGrid
                variant={
                  isThreeCol ? "3col" : leftLabel ? "2col" : "2colNoLabel"
                }
              >
                {isThreeCol ? (
                  <>
                    <MarketRowGridHeader
                      columnCount={3}
                      label=""
                      headers={[
                        market.columnHeaders![0],
                        market.columnHeaders![1],
                        market.columnHeaders![2],
                      ]}
                    />
                    {market.rows.map((row, idx) => (
                      <MarketRowGridRow
                        key={row.id}
                        layout="withLabel"
                        variant="label"
                        labelOrValue={row.rowLabel ?? ""}
                        leftOption={row.options[0]!}
                        rightOption={row.options[1]!}
                        thirdOption={row.options[2]}
                        rowId={row.id}
                        marketId={marketId}
                        selectedIds={selectedIds}
                        onRowSelect={onRowSelect}
                        showRowSeparator={market.rows.length > 4}
                        isFirstRow={idx === 0}
                      />
                    ))}
                  </>
                ) : leftLabel ? (
                  <>
                    <MarketRowGridHeader
                      columnCount={2}
                      label={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![0] ?? ""
                          : ""
                      }
                      leftHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![1] ?? ""
                          : market.columnHeaders![0] ?? ""
                      }
                      rightHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![2] ?? ""
                          : market.columnHeaders![1] ?? ""
                      }
                    />
                    {market.rows.map((row, idx) => (
                      <MarketRowGridRow
                        key={row.id}
                        layout="withLabel"
                        variant={
                          isNumericLabel(row.rowLabel) ? "numeric" : "label"
                        }
                        labelOrValue={row.rowLabel ?? ""}
                        leftOption={row.options[0]!}
                        rightOption={row.options[1]!}
                        rowId={row.id}
                        marketId={marketId}
                        selectedIds={selectedIds}
                        onRowSelect={onRowSelect}
                        showRowSeparator={market.rows.length > 4}
                        isFirstRow={idx === 0}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <MarketRowGridHeader
                      columnCount={2}
                      noLabel
                      label=""
                      leftHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![1] ?? ""
                          : market.columnHeaders![0] ?? ""
                      }
                      rightHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![2] ?? ""
                          : market.columnHeaders![1] ?? ""
                      }
                    />
                    {market.rows.map((row, idx) => (
                      <MarketRowGridRow
                        key={row.id}
                        layout="noLabel"
                        variant="label"
                        labelOrValue=""
                        leftOption={row.options[0]!}
                        rightOption={row.options[1]!}
                        rowId={row.id}
                        marketId={marketId}
                        selectedIds={selectedIds}
                        onRowSelect={onRowSelect}
                        showRowSeparator={market.rows.length > 4}
                        isFirstRow={idx === 0}
                      />
                    ))}
                  </>
                )}
              </MarketGrid>
            ) : (
              <MarketGrid variant={leftLabel ? "2col" : "2colNoLabel"}>
                {market.rows.map((row, idx) => (
                  <MarketRowGridRow
                    key={row.id}
                    layout={leftLabel ? "withLabel" : "noLabel"}
                    variant="label"
                    labelOrValue={row.rowLabel ?? ""}
                    leftOption={row.options[0]!}
                    rightOption={row.options[1]!}
                    rowId={row.id}
                    marketId={marketId}
                    selectedIds={selectedIds}
                    onRowSelect={onRowSelect}
                    showRowSeparator={market.rows.length > 4}
                    isFirstRow={idx === 0}
                  />
                ))}
              </MarketGrid>
            )}
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
